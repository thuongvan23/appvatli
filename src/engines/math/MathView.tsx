// Bộ điều phối chung cho Toán 8: sáu engine (đại số, hàm số, hình học, dữ liệu, xác suất, hình khối)
// dùng chung bộ điều phối này nên một bài có thể kết hợp nhiều loại cảnh.
import type { EngineProps } from '../../core/types';
import { TABLES, TableDoc, TableView } from '../chem/ProcessViews';
import { AreaDoc, AreaView, BalanceDoc, BalanceView, DeriveDoc, DeriveView, FracDoc, FracView, IdentityDoc, IdentityView, MonoDoc, MonoView, PolyDoc, PolyView, SortDoc, SortView } from './AlgebraViews';
import { FmapDoc, FmapView, LinearDoc, LinearView, PlaneDoc, PlaneView } from './FuncViews';
import { BisectorDoc, BisectorView, HeightDoc, HeightView, HomoDoc, HomothetyView, PythagDoc, PythagView, QuadDoc, QuadView, SimilarDoc, SimilarView, ThalesDoc, ThalesView } from './GeoViews';
import { ChartDoc, ChartView, DataFixDoc, DataFixView } from './DataViews';
import { ExperimentDoc, ExperimentView, ProbDoc, ProbView } from './ProbViews';
import { PyramidDoc, PyramidView } from './SolidViews';
import { MATH_TABLES } from './mathData';

// Bảng so sánh của Toán dùng chung kiểu cảnh "table" với Hoá học
Object.assign(TABLES, MATH_TABLES);

export type MathDoc =
  | MonoDoc | SortDoc | PolyDoc | AreaDoc | IdentityDoc | BalanceDoc | FracDoc | DeriveDoc
  | FmapDoc | PlaneDoc | LinearDoc
  | QuadDoc | ThalesDoc | BisectorDoc | SimilarDoc | PythagDoc | HomoDoc | HeightDoc
  | ChartDoc | DataFixDoc | ProbDoc | ExperimentDoc | PyramidDoc | TableDoc;
export type MathOptions = Record<string, never>;

export const MATH_MODES = [
  'mono', 'sort', 'poly', 'area', 'identity', 'balance', 'frac', 'derive',
  'fmap', 'plane', 'linear',
  'quad', 'thales', 'bisector', 'similar', 'pythag', 'homothety', 'height',
  'chart', 'datafix', 'prob', 'experiment', 'pyramid', 'table',
] as const;

export function MathView(props: EngineProps<MathDoc, MathOptions>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = props as EngineProps<any, any>;
  switch (props.doc.mode) {
    case 'mono':
      return <MonoView {...p} />;
    case 'sort':
      return <SortView {...p} />;
    case 'poly':
      return <PolyView {...p} />;
    case 'area':
      return <AreaView {...p} />;
    case 'identity':
      return <IdentityView {...p} />;
    case 'balance':
      return <BalanceView {...p} />;
    case 'frac':
      return <FracView {...p} />;
    case 'derive':
      return <DeriveView {...p} />;
    case 'fmap':
      return <FmapView {...p} />;
    case 'plane':
      return <PlaneView {...p} />;
    case 'linear':
      return <LinearView {...p} />;
    case 'quad':
      return <QuadView {...p} />;
    case 'thales':
      return <ThalesView {...p} />;
    case 'bisector':
      return <BisectorView {...p} />;
    case 'similar':
      return <SimilarView {...p} />;
    case 'pythag':
      return <PythagView {...p} />;
    case 'homothety':
      return <HomothetyView {...p} />;
    case 'height':
      return <HeightView {...p} />;
    case 'chart':
      return <ChartView {...p} />;
    case 'datafix':
      return <DataFixView {...p} />;
    case 'prob':
      return <ProbView {...p} />;
    case 'experiment':
      return <ExperimentView {...p} />;
    case 'pyramid':
      return <PyramidView {...p} />;
    case 'table':
      return <TableView {...p} />;
  }
}
