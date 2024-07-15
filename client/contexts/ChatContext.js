import { createContext, useContext } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const values = {};

    return (
        <ChatContext.Provider value={values}>
            {children}
        </ChatContext.Provider>
    );
}

export const useChat = () => useContext(ChatContext);