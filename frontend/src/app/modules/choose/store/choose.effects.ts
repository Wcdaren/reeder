import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, mapTo, tap } from 'rxjs/operators';

import { GutendexRepository } from '@choose/gutendex-api';
import {
  getBooks,
  gutendexServiceGetBooks,
  gutendexServiceGetBooksFailure,
  gutendexServiceGetBooksSuccess,
} from '@choose/store/choose.actions';

@Injectable()
export class ChooseEffects {
  // clicking the "get booklist" button call the gutendex getBook action
  getBooks$ = createEffect(() => this.actions$.pipe(ofType(getBooks), mapTo(gutendexServiceGetBooks())));

  // Getting booklist action calls the gutendex repository
  getGutendexBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gutendexServiceGetBooks),
      exhaustMap(() =>
        this.gutendexRepository.getPopularBooks().pipe(
          map((bookList) => gutendexServiceGetBooksSuccess({ bookList })),
          catchError((error) => of(gutendexServiceGetBooksFailure({ error }))),
        ),
      ),
    ),
  );

  public constructor(private actions$: Actions, private gutendexRepository: GutendexRepository) {}
}
