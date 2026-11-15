import type { EngineProps } from '../../core/types';
import type { MechDoc, MechOptions } from './model';
import { LeverView, MomentView } from './LeverViews';
import { DropView, PowerView, RampView, TrackView, WorkView } from './EnergyViews';

/** Thí nghiệm cơ học: chọn khung hiển thị theo loại thí nghiệm. */
export function MechanicsView(props: EngineProps<MechDoc, MechOptions>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = props as EngineProps<any, MechOptions>;
  switch (props.doc.mode) {
    case 'moment':
      return <MomentView {...p} />;
    case 'lever':
      return <LeverView {...p} />;
    case 'ramp':
      return <RampView {...p} />;
    case 'drop':
      return <DropView {...p} />;
    case 'track':
      return <TrackView {...p} />;
    case 'work':
      return <WorkView {...p} />;
    case 'power':
      return <PowerView {...p} />;
  }
}
