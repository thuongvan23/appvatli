import type { EngineProps } from '../../core/types';
import type { ThermalDoc, ThermalOptions } from './model';
import { ChargeView, InteractView } from './ChargeViews';
import { ConductionView, ConvectionView, DiffusionView, JouleView, ParticlesView, RadiationView } from './HeatViews';
import { ExpansionView } from './ExpansionView';

/** Thí nghiệm nhiệt – nhiễm điện: chọn khung hiển thị theo loại thí nghiệm. */
export function ThermalView(props: EngineProps<ThermalDoc, ThermalOptions>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = props as EngineProps<any, ThermalOptions>;
  switch (props.doc.mode) {
    case 'charge':
      return <ChargeView {...p} />;
    case 'interact':
      return <InteractView {...p} />;
    case 'particles':
      return <ParticlesView {...p} />;
    case 'diffusion':
      return <DiffusionView {...p} />;
    case 'joule':
      return <JouleView {...p} />;
    case 'conduction':
      return <ConductionView {...p} />;
    case 'convection':
      return <ConvectionView {...p} />;
    case 'radiation':
      return <RadiationView {...p} />;
    case 'expansion':
      return <ExpansionView {...p} />;
  }
}
