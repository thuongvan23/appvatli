// Bộ điều phối chung cho phần Vật lí 7: bốn engine (chuyển động, âm thanh, ánh sáng, từ) dùng chung
// bộ điều phối này nên một bài có thể kết hợp nhiều loại cảnh, kể cả thẻ thông tin và quy trình.
import type { EngineProps } from '../../core/types';
import { CardsDoc, CardsView, StepsDoc, StepsView } from '../chem/InfoViews';
import { TableDoc, TableView } from '../chem/ProcessViews';
import { GraphDoc, GraphView, RaceDoc, RaceView, SafetyDoc, SafetyView, SpeedCamDoc, SpeedCamView, TimerDoc, TimerView } from './MotionViews';
import { BellJarDoc, BellJarView, EchoDoc, EchoView, NoiseDoc, NoiseView, ScopeDoc, ScopeView, SourceDoc, SourceView, WaveDoc, WaveView } from './SoundViews';
import { BeamsDoc, BeamsView, LightEnergyDoc, LightEnergyView, MirrorDoc, MirrorView, ReflectDoc, ReflectView, ShadowDoc, ShadowView } from './LightViews';
import { CoilDoc, CoilView, FieldDoc, FieldView, MagnetsDoc, MagnetsView } from './MagnetViews';

export type Phys7Doc =
  | TimerDoc | RaceDoc | GraphDoc | SafetyDoc | SpeedCamDoc
  | SourceDoc | WaveDoc | BellJarDoc | ScopeDoc | EchoDoc | NoiseDoc
  | LightEnergyDoc | BeamsDoc | ShadowDoc | ReflectDoc | MirrorDoc
  | MagnetsDoc | FieldDoc | CoilDoc
  | CardsDoc | StepsDoc | TableDoc;
export type Phys7Options = Record<string, never>;

export const PHYS7_MODES = [
  'timer', 'race', 'graph', 'safety', 'speedcam',
  'source', 'wave', 'belljar', 'scope', 'echo', 'noise',
  'lightenergy', 'beams', 'shadow', 'reflect', 'mirror',
  'magnets', 'field', 'coil',
  'cards', 'steps', 'table',
] as const;

export function Phys7View(props: EngineProps<Phys7Doc, Phys7Options>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = props as EngineProps<any, any>;
  switch (props.doc.mode) {
    case 'timer':
      return <TimerView {...p} />;
    case 'race':
      return <RaceView {...p} />;
    case 'graph':
      return <GraphView {...p} />;
    case 'safety':
      return <SafetyView {...p} />;
    case 'speedcam':
      return <SpeedCamView {...p} />;
    case 'source':
      return <SourceView {...p} />;
    case 'wave':
      return <WaveView {...p} />;
    case 'belljar':
      return <BellJarView {...p} />;
    case 'scope':
      return <ScopeView {...p} />;
    case 'echo':
      return <EchoView {...p} />;
    case 'noise':
      return <NoiseView {...p} />;
    case 'lightenergy':
      return <LightEnergyView {...p} />;
    case 'beams':
      return <BeamsView {...p} />;
    case 'shadow':
      return <ShadowView {...p} />;
    case 'reflect':
      return <ReflectView {...p} />;
    case 'mirror':
      return <MirrorView {...p} />;
    case 'magnets':
      return <MagnetsView {...p} />;
    case 'field':
      return <FieldView {...p} />;
    case 'coil':
      return <CoilView {...p} />;
    case 'cards':
      return <CardsView {...p} />;
    case 'steps':
      return <StepsView {...p} />;
    case 'table':
      return <TableView {...p} />;
  }
}
