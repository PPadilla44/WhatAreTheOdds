import { createContext, Dispatch, ReactNode, useContext, useEffect, useReducer } from "react";
import statsReducer, { Action, initialStatsState, StatsState } from "../../store/stats";
import { fetchStats } from "../../store/utils/thunkerFunctions";

const StatsCtx = createContext<{ state: StatsState; dispatch?: Dispatch<Action> }>({ state: initialStatsState });

export const useStats = () => useContext(StatsCtx);

type Props = { children: ReactNode };

export const StatsProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(statsReducer, initialStatsState);

    useEffect(() => {
        fetchStats(dispatch);
    }, []);

    return (
        <StatsCtx.Provider value={{ state, dispatch }}>
            {children}
        </StatsCtx.Provider>
    );
};
