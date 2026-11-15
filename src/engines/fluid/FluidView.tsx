import type { EngineProps } from '../../core/types';
import type { FluidDoc, FluidOptions } from './model';
import { DensityView, LiquidDensityView } from './DensityView';
import { AtmView, DepthView, JetsView, PressView, PressureView, VesselsView } from './PressureViews';
import { BuoyancyView, FloatView } from './BuoyancyViews';

/** Thí nghiệm khối lượng riêng – áp suất: chọn khung hiển thị theo loại thí nghiệm. */
export function FluidView(props: EngineProps<FluidDoc, FluidOptions>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = props as EngineProps<any, FluidOptions>;
  switch (props.doc.mode) {
    case 'density':
      return <DensityView {...p} />;
    case 'liquidDensity':
      return <LiquidDensityView {...p} />;
    case 'pressure':
      return <PressureView {...p} />;
    case 'depth':
      return <DepthView {...p} />;
    case 'jets':
      return <JetsView {...p} />;
    case 'vessels':
      return <VesselsView {...p} />;
    case 'press':
      return <PressView {...p} />;
    case 'atm':
      return <AtmView {...p} />;
    case 'buoyancy':
      return <BuoyancyView {...p} />;
    case 'float':
      return <FloatView {...p} />;
  }
}
