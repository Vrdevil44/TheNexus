import { useState, useCallback, useRef } from 'react';
import type { ThemeState } from '@/lib/contexts/ThemeContext';

const MAX_HISTORY = 6; // Initial state + 5 changes

export function useThemeHistory() {
    const [history, setHistory] = useState<ThemeState[]>([]);
    const isUndoing = useRef(false);
    const hasInitialState = useRef(false);

    const saveState = useCallback((state: ThemeState) => {
        // Don't save if we're currently undoing
        if (isUndoing.current) {
            isUndoing.current = false;
            return;
        }

        // First call saves the initial state
        if (!hasInitialState.current) {
            hasInitialState.current = true;
            setHistory([state]);
            return;
        }

        // Subsequent calls save changes
        setHistory(prev => {
            const updated = [...prev, state];

            // Keep only last MAX_HISTORY states (initial + 5 changes)
            if (updated.length > MAX_HISTORY) {
                return updated.slice(updated.length - MAX_HISTORY);
            }

            return updated;
        });
    }, []);

    const undo = useCallback(() => {
        // Need at least 2 states (initial + 1 change) to undo
        if (history.length >= 2) {
            isUndoing.current = true;

            // Get the previous state (second-to-last)
            const previousState = history[history.length - 2];

            // Remove the last state (current)
            setHistory(prev => prev.slice(0, -1));

            return previousState;
        }
        return null;
    }, [history]);

    // Can undo if we have more than just the initial state
    const canUndo = history.length > 1;
    // Count of undoable changes (total states - 1 for initial state)
    const historyCount = Math.max(0, history.length - 1);

    const clearHistory = useCallback(() => {
        setHistory([]);
        hasInitialState.current = false;
    }, []);

    return {
        saveState,
        undo,
        canUndo,
        historyCount,
        clearHistory,
    };
}
