import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import api from './services/api';

export default function App() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            console.log(response.data);
            setProjects(response.data);
        });
    }, []);
    
    async function handleAddProject() {
        const response = await api.post('projects', {
            title: `New Project ${Date.now()}`,
            owner: 'Gabriel Gomes'
        });
        
        const project = response.data;

        setProjects([...projects, project]);
    }

    return (
        <>
        <StatusBar barStyle="light-content" backgroundColor="#46659c" />
        
        <SafeAreaView style={styles.container}>
            <FlatList
                data={projects}
                keyExtractor={project => project.id}
                renderItem={({ item: project }) => (
                    <Text style={styles.project}>{project.title}</Text>
                )}
            />

            <TouchableOpacity 
                onPress={handleAddProject} 
                activeOpacity={0.6} 
                style={styles.button}
            >
                <Text style={styles.buttonText}>Add new project</Text>
            </TouchableOpacity>
        </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#46659c',
    },

    project: {
        fontSize: 32,
        color: '#FFF'
    },

    button: {
        backgroundColor: '#FFF',
        margin: 20, 
        height: 50,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
})