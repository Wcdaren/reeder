import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';

import { ReederRepository } from '@read/reeder-api';
import {
  getBook,
  reederServiceGetBook,
  reederServiceGetBookFailure,
  reederServiceGetBookSuccess,
  reederServiceGetParagraphsSuccess,
} from '@read/store/read.actions';

@Injectable()
export class ReadEffects {
  // clicking the "get book" button call the reeder getBook action
  getBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getBook),
      map((props) => reederServiceGetBook(props)),
    ),
  );

  // Getting book action calls the reeder repository
  getReederBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(reederServiceGetBook),
      exhaustMap(({ bookId }) =>
        this.reederRepository.getBook(bookId).pipe(
          switchMap(({ bookContent, paragraphs }) =>
            // dispatch action for bookContent state and paragraphs state
            of(reederServiceGetBookSuccess({ bookContent }), reederServiceGetParagraphsSuccess({ paragraphs })),
          ),
          catchError((error) => of(reederServiceGetBookFailure({ error }))),
        ),
      ),
    ),
  );

  public constructor(private actions$: Actions, private reederRepository: ReederRepository) {}
}
