import { createContext, useContext, useState, useEffect } from "react";
import {
    Draft,
    DraftMessage,
    DraftPick,
    DraftSettings,
    DraftUser,
    FantasyTeam,
} from "types/drafts";
import { DraftWebSocket } from "services/websockets/drafts/DraftWebSocket";
import { useParams } from "react-router-dom";
import { FootballPlayer, Player } from "types/players";
import { useGlobalContext } from "./GlobalProvider";

type DraftContextType = {
    draftPicks: DraftPick[];
    draftSettings: DraftSettings;
    players: Player[];
    menuHeight: number;
    draftUsers: DraftUser[];
    draftUser: DraftUser | undefined;
    currentPick: DraftPick | null;
    timeRemaining: number;
    isDraftOver: boolean;
    draftId: number;
    fantasyTeams: FantasyTeam[];
    messages: DraftMessage[];
    filteredPlayers: Player[];
    searchName: string;
    selectedPosition: string;
    selectedPlayerId: number;
    isPlayerModalOpen: boolean;
    setSearchName: (name: string) => void;
    setIsPlayerModalOpen: (isOpen: boolean) => void;
    setSelectedPlayerId: (id: number) => void;
    setSelectedPosition: (position: string) => void;
    setPlayers: (players: Player[]) => void;
    setFilteredPlayers: (players: Player[]) => void;
    setMenuHeight: (height: number) => void;
    claimTeam: (teamNumber: number) => void;
    pickPlayer: (draftPick: DraftPick) => void;
    startDraft: () => void;
    toggleAutoDraft: (userId: number, isAutodrafting: boolean) => void;
    enqueuePlayer: (userId: number, draftId: number, playerId: number, rank: number) => void;
    dequeuePlayer: (userId: number, draftId: number, playerId: number) => void;
    updateDraftSettings: (draft: Draft) => void;
    sendMessage: (message: DraftMessage) => void;
    sendDraftInvite: (fromUserId: number, toUserId: number, message: string) => void;
};

const DraftContext = createContext<DraftContextType>({
    draftPicks: [],
    draftSettings: {} as DraftSettings,
    menuHeight: 1,
    players: [],
    draftUsers: [],
    draftUser: undefined,
    currentPick: null,
    timeRemaining: 0,
    isDraftOver: false,
    draftId: 0,
    fantasyTeams: [],
    messages: [],
    filteredPlayers: [],
    searchName: "",
    selectedPosition: "all",
    selectedPlayerId: 0,
    isPlayerModalOpen: false,
    setSearchName: () => {},
    setIsPlayerModalOpen: () => {},
    setSelectedPlayerId: () => {},
    setSelectedPosition: () => {},
    setFilteredPlayers: () => {},
    setPlayers: () => {},
    setMenuHeight: () => {},
    claimTeam: () => {},
    pickPlayer: () => {},
    startDraft: () => {},
    toggleAutoDraft: () => {},
    enqueuePlayer: () => {},
    dequeuePlayer: () => {},
    updateDraftSettings: () => {},
    sendMessage: () => {},
    sendDraftInvite: () => {},
});
export const useDraftContext = () => useContext(DraftContext);

interface Props {
    children: React.ReactNode;
}

export const DraftProvider = ({ children }: Props) => {
    const [selectedPlayerId, setSelectedPlayerId] = useState<number>(0);
    const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);
    const [menuHeight, setMenuHeight] = useState(1);
    const [selectedPosition, setSelectedPosition] = useState("all");
    const [searchName, setSearchName] = useState("");
    const { user } = useGlobalContext();
    const { sport, id } = useParams<{ sport: string; id: string }>();
    const [draftWebSocket, setDraftWebSocket] = useState<DraftWebSocket | null>(null);
    const sportValue = sport ?? "";
    const draftId = id ? parseInt(id) : 0;
    const userId = user?.id ?? 0;
    const [draftPicks, setDraftPicks] = useState<DraftPick[]>([]);
    const [fantasyTeams, setFantasyTeams] = useState<FantasyTeam[]>([]);
    let isDraftOver = false;
    if (draftPicks[draftPicks.length - 1]?.player !== null) {
        isDraftOver = true;
    }
    const [players, setPlayers] = useState<Player[]>([]);
    const [filteredPlayers, setFilteredPlayers] = useState<Player[]>(players);
    const [messages, setMessages] = useState<DraftMessage[]>([]);
    const [draftUsers, setDraftUsers] = useState<DraftUser[]>([]);
    const [timeRemaining, setTimeRemaining] = useState<number>(0);
    const draftUser = draftUsers.find((user) => user.userId === userId);
    const [draftSettings, setDraftSettings] = useState<DraftSettings>({
        pickOrderFormat: "snake",
        scoringFormat: "standard",
        pickTimeLimit: 60,
        teamCount: 10,
        sport: "football",
        isDraftStarted: false,
    });
    let currentPick = null;
    for (let i = 0; i < draftPicks.length; i++) {
        if (draftPicks[i].player == null) {
            currentPick = draftPicks[i];
            break;
        }
    }

    useEffect(() => {
        const playersFilteredByName = players.filter((player) =>
            (player.firstName + " " + player.lastName)
                .toLowerCase()
                .includes(searchName.toLowerCase()),
        );
        if (selectedPosition === "all") {
            setFilteredPlayers(playersFilteredByName);
        } else if (selectedPosition === "quarterback") {
            setFilteredPlayers(
                playersFilteredByName.filter((player) => (player as FootballPlayer).isQuarterback),
            );
        } else if (selectedPosition === "runningback") {
            setFilteredPlayers(
                playersFilteredByName.filter((player) => (player as FootballPlayer).isRunningBack),
            );
        } else if (selectedPosition === "widereceiver") {
            setFilteredPlayers(
                playersFilteredByName.filter((player) => (player as FootballPlayer).isWideReceiver),
            );
        } else if (selectedPosition === "tightend") {
            setFilteredPlayers(
                playersFilteredByName.filter((player) => (player as FootballPlayer).isTightEnd),
            );
        } else if (selectedPosition === "flex") {
            setFilteredPlayers(
                playersFilteredByName.filter(
                    (player) =>
                        (player as FootballPlayer).isWideReceiver ||
                        (player as FootballPlayer).isRunningBack ||
                        (player as FootballPlayer).isTightEnd,
                ),
            );
        } else if (selectedPosition === "kicker") {
            setFilteredPlayers(playersFilteredByName.filter((player) => (player as FootballPlayer).isKicker));
        } else if (selectedPosition === "defense") {
            setFilteredPlayers(
                playersFilteredByName.filter((player) => (player as FootballPlayer).isTeamDefense),
            );
        }
    }, [selectedPosition, players, searchName]);

    const claimTeam = (teamNumber: number) => {
        draftWebSocket?.claimTeam(userId, teamNumber, draftId);
    };

    const sendMessage = (message: DraftMessage) => {
        draftWebSocket?.sendMessage(message, draftId);
    };

    const startDraft = () => {
        draftWebSocket?.startDraft(draftId);
    };

    const pickPlayer = (draftPick: DraftPick) => {
        draftWebSocket?.pickPlayer(draftId, draftPick);
    };

    const toggleAutoDraft = (userId: number, isAutodrafting: boolean) => {
        draftWebSocket?.toggleAutoDraft(userId, draftId, isAutodrafting);
    };
    const enqueuePlayer = (userId: number, draftId: number, playerId: number, rank: number) => {
        draftWebSocket?.enqueuePlayer(userId, draftId, playerId, rank);
    };

    const dequeuePlayer = (userId: number, draftId: number, playerId: number) => {
        draftWebSocket?.dequeuePlayer(userId, draftId, playerId);
    };

    const updateDraftSettings = (draft: Draft) => {
        draftWebSocket?.updateDraftSettings(draft);
    };

    const sendDraftInvite = (fromUserId: number, toUserId: number, message: string) => {
        draftWebSocket?.sendDraftInvite(fromUserId, toUserId, message);
    };

    useEffect(() => {
        const draftSocket = new DraftWebSocket(
            sportValue,
            draftId,
            (
                newPicks,
                newSettings,
                newPlayers,
                newUsers,
                newTimeRemaining,
                newFantasyTeams,
                newMessages,
            ) => {
                setDraftPicks(newPicks);
                setDraftSettings(newSettings);
                setPlayers(newPlayers);
                setDraftUsers(newUsers);
                setTimeRemaining(newTimeRemaining);
                setFantasyTeams(newFantasyTeams);
                setMessages(newMessages);
            },
        );

        setDraftWebSocket(draftSocket);

        return () => {
            draftSocket.disconnect();
        };
    }, [sportValue, draftId]);

    return (
        <DraftContext.Provider
            value={{
                draftPicks,
                draftSettings,
                menuHeight,
                setMenuHeight,
                setPlayers,
                players,
                filteredPlayers,
                setFilteredPlayers,
                searchName,
                setSearchName,
                selectedPosition,
                setSelectedPosition,
                setSelectedPlayerId,
                setIsPlayerModalOpen,
                selectedPlayerId,
                isPlayerModalOpen,
                currentPick,
                timeRemaining,
                isDraftOver,
                draftId,
                fantasyTeams,
                messages,
                claimTeam,
                pickPlayer,
                draftUsers,
                draftUser,
                startDraft,
                toggleAutoDraft,
                enqueuePlayer,
                dequeuePlayer,
                updateDraftSettings,
                sendMessage,
                sendDraftInvite,
            }}
        >
            {children}
        </DraftContext.Provider>
    );
};
