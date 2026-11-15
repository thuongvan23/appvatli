import type { EngineProps } from '../../core/types';
import type { ColorDoc, LensDoc, OpticsDoc, OpticsOptions, RaysDoc } from './model';
import { RaysView } from './RaysView';
import { LensView } from './LensView';
import { ColorView } from './ColorView';

/** Bàn quang học: chọn chế độ hiển thị theo loại tài liệu. */
export function OpticsView(props: EngineProps<OpticsDoc, OpticsOptions>) {
  const { doc } = props;
  if (doc.mode === 'lens') return <LensView {...(props as unknown as EngineProps<LensDoc, OpticsOptions>)} />;
  if (doc.mode === 'color') return <ColorView {...(props as unknown as EngineProps<ColorDoc, OpticsOptions>)} />;
  return <RaysView {...(props as unknown as EngineProps<RaysDoc, OpticsOptions>)} />;
}
