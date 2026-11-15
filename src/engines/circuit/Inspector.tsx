import type { MutableRefObject, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { CircuitDoc, MATERIALS, Material, Part, PartProps, PART_INFO, WIRE_MATERIALS, WireMaterial, lampR, wireSampleR } from './model';
import { SolveResult, partResistance } from './solver';
import { Dial, majorStep } from './glyphs';
import { fmt, fmtAmp, fmtMeter, fmtOhm, fmtShort } from '../../core/format';

interface Props {
  part: Part | null;
  wireSelected: boolean;
  res: SolveResult;
  doc: CircuitDoc;
  level: 8 | 9;
  locked: boolean;
  showValues: boolean;
  onPatch: (id: string, props: PartProps) => void;
  onRotate: (id: string) => void;
  onFlip: (id: string) => void;
  onDelete: () => void;
  table: boolean;
  energy?: { counter: MutableRefObject<{ hours: number; kwh: number }>; timeScale: number; setTimeScale: (n: number) => void };
  onClearCopper: (id: string) => void;
}

const LAMP_PRESETS: [number, number][] = [
  [3, 0.9],
  [6, 3],
  [12, 6],
  [220, 40],
  [220, 60],
  [220, 100],
];

const RANGES: Record<'ammeter' | 'voltmeter', number[]> = {
  ammeter: [0.1, 0.6, 1, 3],
  voltmeter: [3, 6, 15, 300],
};

export function Inspector(p: Props) {
  const { part, level, showValues } = p;
  return (
    <aside className="cb-inspector">
      {part ? (
        <PartPanel {...p} part={part} />
      ) : (
        <div className="insp-empty">
          {p.wireSelected ? (
            <>
              <h3>Dây nối</h3>
              {!p.locked && (
                <button className="btn danger" onClick={p.onDelete}>
                  Xoá dây (Delete)
                </button>
              )}
            </>
          ) : (
            <p className="muted">Bấm vào một linh kiện để xem và chỉnh thông số.</p>
          )}
        </div>
      )}
      {p.energy && <EnergyMeter {...p.energy} res={p.res} doc={p.doc} />}
      {p.table && <ValueTable doc={p.doc} res={p.res} showValues={showValues} level={level} />}
    </aside>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="insp-row">
      <div className="insp-label">{label}</div>
      <div className="insp-ctl">{children}</div>
    </div>
  );
}

function Seg<T extends string | number>({ value, options, onChange, fmtOpt }: { value: T; options: T[]; onChange: (v: T) => void; fmtOpt?: (v: T) => string }) {
  return (
    <div className="seg wrap">
      {options.map((o) => (
        <button key={String(o)} className={o === value ? 'on' : ''} onClick={() => onChange(o)}>
          {fmtOpt ? fmtOpt(o) : String(o)}
        </button>
      ))}
    </div>
  );
}

function Slider({ value, min, max, step, onChange, suffix }: { value: number; min: number; max: number; step: number; onChange: (v: number) => void; suffix?: string }) {
  return (
    <div className="slider">
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
      <span className="slider-val">
        {fmtShort(value, 2)}
        {suffix ? ` ${suffix}` : ''}
      </span>
    </div>
  );
}

function PartPanel({ part, res, level, locked, showValues, onPatch, onRotate, onFlip, onDelete, onClearCopper }: Props & { part: Part }) {
  const pr = part.props;
  const set = (props: PartProps) => onPatch(part.id, props);
  const r = res.parts[part.id];
  const info = PART_INFO[part.type];
  const canEdit = !locked && !pr.fixed;
  const hidden = '?';

  const controls: ReactNode[] = [];
  switch (part.type) {
    case 'battery':
      controls.push(
        <Row key="c" label="Số pin (mỗi pin 1,5 V)">
          <Seg value={pr.cells ?? 1} options={[1, 2, 3, 4]} onChange={(v) => set({ cells: v })} fmtOpt={(v) => `${v} pin`} />
        </Row>,
        <Row key="e" label="Hiệu điện thế giữa hai cực">
          <b className="big">{fmtShort(1.5 * (pr.cells ?? 1), 1)} V</b>
        </Row>,
      );
      break;
    case 'supply': {
      const v = pr.voltage ?? 0;
      const mains = v >= 100;
      controls.push(
        <Row key="v" label={mains ? 'Lưới điện gia đình' : 'Hiệu điện thế nguồn'}>
          {mains ? <b className="big">{v} V</b> : <Slider value={v} min={0} max={24} step={0.5} onChange={(x) => set({ voltage: x })} suffix="V" />}
        </Row>,
      );
      break;
    }
    case 'switch':
      controls.push(
        <Row key="k" label="Trạng thái">
          <button className={`btn big-toggle ${pr.closed ? 'on' : ''}`} onClick={() => set({ closed: !pr.closed })}>
            {pr.closed ? 'Đang ĐÓNG – bấm để ngắt' : 'Đang NGẮT – bấm để đóng'}
          </button>
        </Row>,
      );
      break;
    case 'lamp':
      controls.push(
        <Row key="l" label="Loại bóng (định mức)">
          <Seg
            value={`${pr.ratedV}-${pr.ratedP}`}
            options={LAMP_PRESETS.map(([a, b]) => `${a}-${b}`)}
            onChange={(v) => {
              const [a, b] = v.split('-').map(Number);
              set({ ratedV: a, ratedP: b });
            }}
            fmtOpt={(v) => {
              const [a, b] = v.split('-').map(Number);
              return `${a} V – ${fmtShort(b)} W`;
            }}
          />
        </Row>,
      );
      if (level === 9) controls.push(<Row key="r" label="Điện trở của đèn">{fmtOhm(lampR(pr))}</Row>);
      controls.push(
        <Row key="b" label="">
          <button className="btn" onClick={() => set({ broken: !pr.broken })}>
            {pr.broken ? 'Lắp bóng mới vào' : 'Tháo bóng đèn ra'}
          </button>
        </Row>,
      );
      if (r && showValues) {
        const ratio = Math.abs(r.P) / (pr.ratedP ?? 0.9);
        const state = pr.broken ? 'Bóng đã tháo/cháy' : ratio < 0.02 ? 'Không sáng' : ratio < 0.7 ? 'Sáng yếu hơn bình thường' : ratio <= 1.15 ? 'Sáng bình thường' : 'Sáng quá mức – dễ cháy';
        controls.push(<Row key="s" label="Độ sáng">{state}</Row>);
      }
      break;
    case 'led':
      controls.push(
        <Row key="c" label="Màu">
          <Seg value={pr.color ?? 'red'} options={['red', 'yellow', 'green', 'blue']} onChange={(v) => set({ color: v as PartProps['color'] })} fmtOpt={(v) => ({ red: 'Đỏ', yellow: 'Vàng', green: 'Xanh lá', blue: 'Xanh lam' })[v as string] ?? v} />
        </Row>,
        <Row key="s" label="Trạng thái">{pr.broken ? 'LED đã hỏng' : r?.on ? 'Đang sáng' : 'Không sáng'}</Row>,
      );
      if (pr.broken) controls.push(<button key="fix" className="btn" onClick={() => set({ broken: false })}>Thay LED mới</button>);
      break;
    case 'resistor':
      controls.push(
        <Row key="r" label="Điện trở">
          <Seg value={pr.R ?? 10} options={[2, 4, 5, 6, 10, 12, 15, 20, 30, 40, 100, 220]} onChange={(v) => set({ R: v })} fmtOpt={(v) => `${v} Ω`} />
        </Row>,
      );
      break;
    case 'rheostat':
      controls.push(
        <Row key="m" label="Điện trở lớn nhất">
          <Seg value={pr.Rmax ?? 20} options={[10, 20, 50, 100]} onChange={(v) => set({ Rmax: v })} fmtOpt={(v) => `${v} Ω`} />
        </Row>,
        <Row key="p" label="Vị trí con chạy">
          <Slider value={pr.pos ?? 0.5} min={0} max={1} step={0.02} onChange={(v) => set({ pos: v })} />
        </Row>,
      );
      if (level === 9) controls.push(<Row key="r" label="Điện trở đang dùng">{fmtOhm(partResistance(part))}</Row>);
      break;
    case 'ammeter':
    case 'voltmeter': {
      const unit = part.type === 'ammeter' ? 'A' : 'V';
      const v = r ? (part.type === 'ammeter' ? r.I : r.U) : 0;
      const range = pr.range ?? 1;
      controls.push(
        <Row key="d" label="Kiểu đồng hồ">
          <Seg value={pr.display ?? 'digital'} options={['digital', 'analog']} onChange={(x) => set({ display: x as PartProps['display'] })} fmtOpt={(x) => (x === 'digital' ? 'Hiện số' : 'Kim')} />
        </Row>,
        <Row key="g" label="Giới hạn đo (GHĐ)">
          <Seg value={range} options={RANGES[part.type]} onChange={(x) => set({ range: x })} fmtOpt={(x) => `${x.toLocaleString('vi-VN')} ${unit}`} />
        </Row>,
      );
      if (pr.display === 'analog') {
        controls.push(
          <div key="dial" className="insp-dial">
            <svg viewBox="-130 -132 260 160">
              <Dial cx={0} cy={0} r={120} value={v} range={range} unit={unit} showValues={showValues} detailed />
            </svg>
            <div className="muted small">
              GHĐ: {range.toLocaleString('vi-VN')} {unit} · ĐCNN: {fmtShort(majorStep(range) / 5, 3)} {unit}
            </div>
          </div>,
        );
      } else {
        controls.push(
          <div key="lcd" className="insp-lcd">
            {showValues ? fmtMeter(v, unit) : hidden}
          </div>,
        );
      }
      break;
    }
    case 'fuse':
      controls.push(
        <Row key="m" label="Dòng điện tối đa">
          <Seg value={pr.maxI ?? 0.5} options={[0.2, 0.5, 1, 2, 5]} onChange={(v) => set({ maxI: v })} fmtOpt={(v) => `${v.toLocaleString('vi-VN')} A`} />
        </Row>,
        <Row key="s" label="Trạng thái">{pr.broken ? 'Dây chì đã đứt – mạch bị ngắt' : 'Bình thường'}</Row>,
      );
      if (pr.broken) controls.push(<button key="fix" className="btn" onClick={() => set({ broken: false })}>Thay cầu chì mới</button>);
      break;
    case 'electrolysis':
      controls.push(
        <p key="t" className="muted small">Dung dịch đồng sunfat (CuSO₄). Khi có dòng điện chạy qua, đồng bám dần vào điện cực nối với cực âm của nguồn.</p>,
        <button key="c" className="btn" onClick={() => onClearCopper(part.id)}>Làm sạch điện cực</button>,
      );
      break;
    case 'coil':
      controls.push(<p key="t" className="muted small">Cuộn dây quấn quanh lõi sắt. Khi có dòng điện chạy qua, cuộn dây hút các đinh sắt.</p>);
      break;
    case 'bell':
      controls.push(<p key="t" className="muted small">Chuông điện hoạt động nhờ tác dụng từ của dòng điện.</p>);
      break;
    case 'heater':
      controls.push(
        <Row key="r" label="Điện trở dây đốt">
          <Seg value={pr.R ?? 2} options={[1, 2, 4, 8]} onChange={(v) => set({ R: v })} fmtOpt={(v) => `${v} Ω`} />
        </Row>,
      );
      break;
    case 'sample':
      controls.push(
        <Row key="m" label="Vật liệu">
          <div className="mat-grid">
            {(Object.keys(MATERIALS) as Material[]).map((m) => (
              <button key={m} className={pr.material === m ? 'on' : ''} onClick={() => set({ material: m })}>
                {MATERIALS[m].name}
              </button>
            ))}
          </div>
        </Row>,
      );
      if (showValues) controls.push(<Row key="k" label="Kết luận">{MATERIALS[pr.material ?? 'dong'].conductor ? 'Vật dẫn điện' : 'Vật cách điện'}</Row>);
      break;
    case 'wireSample':
      controls.push(
        <Row key="m" label="Vật liệu dây">
          <Seg value={pr.wireMaterial ?? 'nicrom'} options={Object.keys(WIRE_MATERIALS) as WireMaterial[]} onChange={(v) => set({ wireMaterial: v })} fmtOpt={(v) => WIRE_MATERIALS[v].name} />
        </Row>,
        <Row key="l" label="Chiều dài l">
          <Slider value={pr.length ?? 1} min={0.2} max={5} step={0.1} onChange={(v) => set({ length: v })} suffix="m" />
        </Row>,
        <Row key="s" label="Tiết diện S">
          <Seg value={pr.area ?? 0.1} options={[0.05, 0.1, 0.2, 0.5, 1]} onChange={(v) => set({ area: v })} fmtOpt={(v) => `${v.toLocaleString('vi-VN')} mm²`} />
        </Row>,
        <Row key="rho" label="Điện trở suất ρ">{WIRE_MATERIALS[pr.wireMaterial ?? 'nicrom'].rho.toExponential(1).replace('.', ',')} Ω·m</Row>,
        <Row key="R" label="R = ρ·l / S">{showValues ? fmtOhm(wireSampleR(pr)) : hidden}</Row>,
      );
      break;
  }

  return (
    <div className="insp-part">
      <h3>
        {info.name}
        {pr.label ? <span className="tag">{pr.label}</span> : null}
      </h3>
      {controls}
      {level === 9 && r && part.type !== 'ammeter' && part.type !== 'voltmeter' && (
        <div className="insp-values">
          <div>
            <span>U</span>
            <b>{showValues ? `${fmt(Math.abs(r.U), 2)} V` : hidden}</b>
          </div>
          <div>
            <span>I</span>
            <b>{showValues ? fmtAmp(Math.abs(r.I)) : hidden}</b>
          </div>
          <div>
            <span>P</span>
            <b>{showValues ? `${fmt(Math.abs(r.P), 2)} W` : hidden}</b>
          </div>
        </div>
      )}
      <div className="insp-actions">
        {canEdit && <button className="btn" onClick={() => onRotate(part.id)}>⟳ Xoay (R)</button>}
        {info.polar && !pr.fixed && <button className="btn" onClick={() => onFlip(part.id)}>⇄ Đảo chiều</button>}
        {canEdit && (
          <button className="btn danger" onClick={onDelete}>
            Xoá
          </button>
        )}
      </div>
    </div>
  );
}

function ValueTable({ doc, res, showValues, level }: { doc: CircuitDoc; res: SolveResult; showValues: boolean; level: 8 | 9 }) {
  const rows = doc.parts.filter((p) => !['ammeter', 'voltmeter', 'switch', 'fuse'].includes(p.type));
  const h = (s: string) => (showValues ? s : '?');
  return (
    <div className="insp-table">
      <h4>Bảng giá trị</h4>
      <table>
        <thead>
          <tr>
            <th></th>
            {level === 9 && <th>R</th>}
            <th>U (V)</th>
            <th>I (A)</th>
            {level === 9 && <th>P (W)</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((p) => {
            const r = res.parts[p.id];
            const isSrc = p.type === 'battery' || p.type === 'supply';
            const R = isSrc ? '' : fmtOhm(partResistance(p)).replace(' Ω', '');
            return (
              <tr key={p.id}>
                <td>{p.props.label ?? PART_INFO[p.type].name}</td>
                {level === 9 && <td>{isSrc ? '' : h(R)}</td>}
                <td>{h(fmt(Math.abs(r?.U ?? 0), 2))}</td>
                <td>{h(fmt(Math.abs(r?.I ?? 0), Math.abs(r?.I ?? 0) < 0.1 ? 3 : 2))}</td>
                {level === 9 && <td>{h(fmt(Math.abs(r?.P ?? 0), 2))}</td>}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function EnergyMeter({ counter, timeScale, setTimeScale, res, doc }: { counter: MutableRefObject<{ hours: number; kwh: number }>; timeScale: number; setTimeScale: (n: number) => void; res: SolveResult; doc: CircuitDoc }) {
  const [, force] = useState(0);
  const [price, setPrice] = useState(2000);
  useEffect(() => {
    const t = setInterval(() => force((x) => x + 1), 200);
    return () => clearInterval(t);
  }, []);
  let P = 0;
  for (const p of doc.parts) if (p.type === 'battery' || p.type === 'supply') P += Math.max(0, res.parts[p.id]?.P ?? 0);
  const e = counter.current;
  const h = Math.floor(e.hours);
  const m = Math.floor((e.hours - h) * 60);
  return (
    <div className="energy">
      <h4>Công tơ điện</h4>
      <div className="energy-counter">{e.kwh.toFixed(3).replace('.', ',')} <small>kWh</small></div>
      <div className="energy-grid">
        <span>Công suất đang dùng</span>
        <b>{fmtShort(P, 1)} W</b>
        <span>Thời gian sử dụng</span>
        <b>
          {h} giờ {m} phút
        </b>
        <span>Giá điện</span>
        <b>
          <input type="number" value={price} step={100} min={0} onChange={(ev) => setPrice(Number(ev.target.value))} /> đ/kWh
        </b>
        <span>Tiền điện</span>
        <b>{Math.round(e.kwh * price).toLocaleString('vi-VN')} đ</b>
      </div>
      <div className="seg wrap">
        <button className={timeScale === 0 ? 'on' : ''} onClick={() => setTimeScale(0)}>Dừng</button>
        <button className={timeScale === 1 / 60 ? 'on' : ''} onClick={() => setTimeScale(1 / 60)}>1 giây = 1 phút</button>
        <button className={timeScale === 1 ? 'on' : ''} onClick={() => setTimeScale(1)}>1 giây = 1 giờ</button>
      </div>
      <button
        className="btn"
        onClick={() => {
          counter.current.hours = 0;
          counter.current.kwh = 0;
          force((x) => x + 1);
        }}
      >
        Đặt lại công tơ
      </button>
    </div>
  );
}
