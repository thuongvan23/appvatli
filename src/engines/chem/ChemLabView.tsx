// Bộ điều phối chung cho phần Hoá học. Ba engine H1 (bàn thí nghiệm), H2 (mô hình phân tử), H3 (sơ đồ – quy trình)
// dùng chung bộ điều phối này nên một bài có thể kết hợp các loại cảnh khác nhau.
import type { EngineProps } from '../../core/types';
import { TubesDoc, TubesView } from './TubesView';
import { PhDoc, PhView, TitrationDoc, TitrationView } from './AcidBaseViews';
import { RateDoc, RateView } from './RateView';
import { MassDoc, MassView, MixDoc, MixView, PrepareDoc, PrepareView, SolutionDoc, SolutionView } from './SolutionViews';
import { BalanceDoc, BalanceView, RearrangeDoc, RearrangeView, StoichDoc, StoichView } from './ReactionViews';
import { GasDensDoc, GasDensView, MoleDoc, MoleView } from './MoleViews';
import { ClassifyDoc, ClassifyView, FuelHeatDoc, FuelHeatView, IonicDoc, IonicView, PolymerDoc, PolymerView, StructureDoc, StructureView } from './OrganicViews';
import { CardsDoc, CardsView, StepsDoc, StepsView } from './InfoViews';
import {
  ActivityDoc, ActivityView, CarbonDoc, CarbonView, ConductDoc, ConductView, CrustDoc, CrustView, DistillDoc, DistillView, FertDoc, FertView,
  FurnaceDoc, FurnaceView, PhotoDoc, PhotoView, RelationsDoc, RelationsView, SolTableDoc, SolTableView, TableDoc, TableView,
} from './ProcessViews';
import { AtomDoc, AtomView, BondDoc, BondView, IonPropDoc, IonPropView, MoleculesDoc, MoleculesView, PTableDoc, PTableView, PercentDoc, PercentView, SymbolsDoc, SymbolsView, ValenceDoc, ValenceView } from './AtomViews';

export type ChemDoc =
  | TubesDoc | PhDoc | TitrationDoc | RateDoc | SolutionDoc | PrepareDoc | MixDoc | MassDoc
  | RearrangeDoc | BalanceDoc | StoichDoc | MoleDoc | GasDensDoc | StructureDoc | ClassifyDoc | PolymerDoc | IonicDoc | FuelHeatDoc
  | CardsDoc | StepsDoc | RelationsDoc | SolTableDoc | ActivityDoc | FurnaceDoc | DistillDoc | FertDoc | ConductDoc | CrustDoc | CarbonDoc | PhotoDoc | TableDoc
  | AtomDoc | SymbolsDoc | PTableDoc | MoleculesDoc | BondDoc | ValenceDoc | PercentDoc | IonPropDoc;
export type ChemOptions = Record<string, never>;

export function ChemView(props: EngineProps<ChemDoc, ChemOptions>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = props as EngineProps<any, any>;
  switch (props.doc.mode) {
    case 'tubes':
      return <TubesView {...p} />;
    case 'ph':
      return <PhView {...p} />;
    case 'titration':
      return <TitrationView {...p} />;
    case 'rate':
      return <RateView {...p} />;
    case 'solution':
      return <SolutionView {...p} />;
    case 'prepare':
      return <PrepareView {...p} />;
    case 'mix':
      return <MixView {...p} />;
    case 'mass':
      return <MassView {...p} />;
    case 'rearrange':
      return <RearrangeView {...p} />;
    case 'balance':
      return <BalanceView {...p} />;
    case 'stoich':
      return <StoichView {...p} />;
    case 'mole':
      return <MoleView {...p} />;
    case 'gasdens':
      return <GasDensView {...p} />;
    case 'structure':
      return <StructureView {...p} />;
    case 'classify':
      return <ClassifyView {...p} />;
    case 'polymer':
      return <PolymerView {...p} />;
    case 'ionic':
      return <IonicView {...p} />;
    case 'fuelheat':
      return <FuelHeatView {...p} />;
    case 'cards':
      return <CardsView {...p} />;
    case 'steps':
      return <StepsView {...p} />;
    case 'relations':
      return <RelationsView {...p} />;
    case 'soltable':
      return <SolTableView {...p} />;
    case 'activity':
      return <ActivityView {...p} />;
    case 'furnace':
      return <FurnaceView {...p} />;
    case 'distill':
      return <DistillView {...p} />;
    case 'fert':
      return <FertView {...p} />;
    case 'conduct':
      return <ConductView {...p} />;
    case 'crust':
      return <CrustView {...p} />;
    case 'carbon':
      return <CarbonView {...p} />;
    case 'photo':
      return <PhotoView {...p} />;
    case 'table':
      return <TableView {...p} />;
    case 'atom':
      return <AtomView {...p} />;
    case 'symbols':
      return <SymbolsView {...p} />;
    case 'ptable':
      return <PTableView {...p} />;
    case 'molecules':
      return <MoleculesView {...p} />;
    case 'bond':
      return <BondView {...p} />;
    case 'valence':
      return <ValenceView {...p} />;
    case 'percent':
      return <PercentView {...p} />;
    case 'ionprop':
      return <IonPropView {...p} />;
  }
}
