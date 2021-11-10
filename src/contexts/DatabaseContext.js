import React, { createContext, useContext, useState, useEffect } from 'react';
import { database } from '../firebase';
import { ref, set, push, child, remove, get } from "firebase/database";

const DatabaseContext = createContext();

export function useDatabase() {
    return useContext(DatabaseContext);
}

export function DatabaseProvider({ children }) {
    const [allKnowledge, setAllKnowledge] = useState([]);
    const [loading, setLoading] = useState(true);

    // /knowledge operations
    const createKnowledge = async () => {
        return await push(child(ref(database), 'knowledge')).key;
    };
    const readKnowledge = (knowledgeItemId, callback=() => {}) => {
        get(child(ref(database), 'knowledge/' + knowledgeItemId))
        .then((snapshot) => {
            if (snapshot.exists()) {
                callback(snapshot.val());
            } else {
                console.log("No data available");
            }
        })
        .catch((error) => {
            console.error(error);
        });
    };
    const readAllKnowledge = (callback=() => {}) => {
        get(child(ref(database), 'knowledge'))
        .then((snapshot) => {
            if (snapshot.exists()) {
                setAllKnowledge(snapshot.val());
                callback(snapshot.val());
            } else {
                console.log("No data available");
            }
        })
        .catch((error) => {
            console.error(error);
        });
    };
    const updateKnowledge = (knowledgeItem, callback, errorCallback) => {
        set(ref(database, 'knowledge/' + knowledgeItem.key), knowledgeItem)
        .then((res) => { callback(res) })
        .catch((err) => { errorCallback(err) });
    };
    const deleteKnowledge = (knowledgeItemId, callback) => {
        return remove(ref(database, 'knowledge/' + knowledgeItemId))
        .then((res) => { callback(res) })
        .catch((err) => { console.log('error: ', err) });
    };
    const deleteAllKnowledge = (callback) => {
        return remove(ref(database, 'knowledge'))
        .then((res) => { callback && callback(res) })
        .catch((err) => { console.log('error: ', err) });
    };

    useEffect(() => {
        readAllKnowledge();
        setLoading(false);
    }, [])

    const value = {
        allKnowledge,
        createKnowledge,
        readKnowledge,
        readAllKnowledge,
        updateKnowledge, 
        deleteKnowledge,
        deleteAllKnowledge
    }

    return (
        <DatabaseContext.Provider value={value}>
            { !loading && children }
        </DatabaseContext.Provider>
    );
}
