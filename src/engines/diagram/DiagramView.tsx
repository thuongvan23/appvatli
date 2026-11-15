import type { EngineProps } from '../../core/types';
import { MeterQuizView, QuizDoc, ReportGuideDoc, ReportGuideView, ToolsDoc, ToolsView } from './ToolsViews';
import { ClimateDoc, ClimateView, CycleDoc, CycleView, FossilDoc, FossilView, HydroDoc, HydroView, RenewDoc, RenewView, SavingDoc, SavingView, SolarDoc, SolarView, WindDoc, WindView } from './EnergyDiagrams';

export type DiagramDoc = ToolsDoc | QuizDoc | ReportGuideDoc | CycleDoc | FossilDoc | ClimateDoc | RenewDoc | WindDoc | SolarDoc | HydroDoc | SavingDoc;
export type DiagramOptions = Record<string, never>;

/** Sơ đồ tương tác cho các bài thiên về lí thuyết. */
export function DiagramView(props: EngineProps<DiagramDoc, DiagramOptions>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = props as EngineProps<any, any>;
  switch (props.doc.mode) {
    case 'tools':
      return <ToolsView {...p} />;
    case 'meterQuiz':
      return <MeterQuizView {...p} />;
    case 'reportGuide':
      return <ReportGuideView {...p} />;
    case 'cycle':
      return <CycleView {...p} />;
    case 'fossil':
      return <FossilView {...p} />;
    case 'climate':
      return <ClimateView {...p} />;
    case 'renew':
      return <RenewView {...p} />;
    case 'wind':
      return <WindView {...p} />;
    case 'solar':
      return <SolarView {...p} />;
    case 'hydro':
      return <HydroView {...p} />;
    case 'saving':
      return <SavingView {...p} />;
  }
}
