import type { LessonContent } from '../core/types';
import { CIRCUIT_LESSONS } from './circuit';
import { OPTICS_LESSONS } from './optics';
import { FLUID_LESSONS } from './fluid';
import { MECH_LESSONS } from './mechanics';
import { THERMAL_LESSONS } from './thermal';
import { EM_LESSONS } from './electromagnet';
import { DIAGRAM_LESSONS } from './diagram';
import { CHEM8_LESSONS } from './chem8';
import { CHEM9_LESSONS } from './chem9';
import { PHYS7_LESSONS } from './phys7';
import { CHEM7_LESSONS } from './chem7';
import { MATH8A_LESSONS } from './math8a';
import { MATH8B_LESSONS } from './math8b';
import { MATH9_LESSONS } from './math9';
import { MATH7_LESSONS } from './math7';

export const CONTENT: Record<string, LessonContent> = {
  ...CIRCUIT_LESSONS,
  ...OPTICS_LESSONS,
  ...FLUID_LESSONS,
  ...MECH_LESSONS,
  ...THERMAL_LESSONS,
  ...EM_LESSONS,
  ...DIAGRAM_LESSONS,
  ...CHEM8_LESSONS,
  ...CHEM9_LESSONS,
  ...PHYS7_LESSONS,
  ...CHEM7_LESSONS,
  ...MATH8A_LESSONS,
  ...MATH8B_LESSONS,
  ...MATH9_LESSONS,
  ...MATH7_LESSONS,
};

export const isReady = (id: string) => id in CONTENT;
