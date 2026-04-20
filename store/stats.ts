// Persistent stats store – tracks best (fewest clicks to hit) and total hits
// across sessions. Persisted via AsyncStorage under @Stats.

export type StatsKind = 'GET_STATE' | 'RECORD_HIT' | 'RESET' | 'SET_FETCHING';

export interface Action {
    type: StatsKind;
    payload?: any;
}

export interface StatsData {
    bestClicks: number | null; // fewest clicks to hit
    totalHits: number;         // lifetime hit count
}

export interface StatsState {
    fetching: boolean;
    data: StatsData;
}

export const initialStatsState: StatsState = {
    fetching: true,
    data: {
        bestClicks: null,
        totalHits: 0,
    }
};

function reducer(state: StatsState, action: Action): StatsState {
    const { type, payload } = action;

    switch (type) {
        case 'SET_FETCHING':
            return { ...state, fetching: payload };
        case 'GET_STATE':
            return { ...state, data: JSON.parse(payload) };
        case 'RECORD_HIT': {
            const { clicks } = payload as { clicks: number };
            const next: StatsData = {
                totalHits: state.data.totalHits + 1,
                bestClicks:
                    state.data.bestClicks == null
                        ? clicks
                        : Math.min(state.data.bestClicks, clicks),
            };
            return { ...state, data: next };
        }
        case 'RESET':
            return { ...state, data: { bestClicks: null, totalHits: 0 } };
        default:
            return state;
    }
}

export default reducer;
