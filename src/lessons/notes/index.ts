import type { LessonNotes } from './types';
import { NOTES_8A } from './notes8a';
import { NOTES_8B } from './notes8b';
import { NOTES_8C } from './notes8c';
import { NOTES_9A } from './notes9a';
import { NOTES_9B } from './notes9b';
import { NOTES_H8 } from './notesH8';
import { NOTES_H9 } from './notesH9';
import { NOTES_7 } from './notes7';
import { NOTES_H7 } from './notesH7';
import { NOTES_T8A } from './notesT8a';
import { NOTES_T8B } from './notesT8b';
import { NOTES_T9 } from './notesT9';
import { NOTES_T7 } from './notesT7';

/** Nội dung bài học: 48 bài Vật lí, 37 bài Hoá học (KHTN 7, 8, 9) 37 bài Toán 7, 39 bài Toán 8 và 32 bài Toán 9. */
export const NOTES: Record<string, LessonNotes> = { ...NOTES_8A, ...NOTES_8B, ...NOTES_8C, ...NOTES_9A, ...NOTES_9B, ...NOTES_H8, ...NOTES_H9, ...NOTES_7, ...NOTES_H7, ...NOTES_T8A, ...NOTES_T8B, ...NOTES_T9, ...NOTES_T7 };
