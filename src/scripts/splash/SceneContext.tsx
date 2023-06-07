import { createContext, useContext, useState } from 'react';

const LoadingContext = createContext<{
  // loading
  loading: boolean;
  setLoading: (val: boolean) => void;

  // game
  game: boolean;
  setGame: (val: boolean) => void;
} | null>(null);

export function LoadingProvider({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}): JSX.Element {
  const query = new URLSearchParams(window.location.search);
  const [loading, setLoading] = useState(false);

  // a convenient way to omit menu by appending ?startAt=game in the URL
  const startAtGame = query.get('startAt') === 'game';
  const [game, setGame] = useState(startAtGame);
  const value = { loading, setLoading, game, setGame };

  return (
    <>
      <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
    </>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider');
  }
  return context;
}

export function useIntro() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider');
  }
  return context;
}
