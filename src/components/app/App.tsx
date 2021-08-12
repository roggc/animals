import React,{useMemo} from 'react'
import styled from 'styled-components'
import {users} from '../../assets'

interface IUser {
    id: string;
    name: {
        given: string;
        surname: string;
    };
    points: number;
    animals: string[];
    isActive: boolean;
    age: number;
}

interface IAppProps{}

export const App:React.FC<IAppProps>=({})=>{

    /**
     * this calculates the list of different available animals in users
     */
    const availableAnimals=useMemo(()=>{
        const animals:string[]=[]
        users.forEach((user)=>{
            user.animals.forEach((animal)=>{
                if(!animals.find((animal_)=>animal===animal_)){
                    animals.push(animal)
                }
            })
        })
        return animals
    },[users])

    const getUsersForAnimalUpToTen=(animal:string)=>{
        const usersForAnimal:IUser[]=[]
        users.forEach((user)=>{
            if(user.isActive){
                if(user.animals.find(animal_=>animal===animal_)){
                    usersForAnimal.push(user)
                }
            }
        })
        return usersForAnimal.sort((a,b)=>b.points-a.points).slice(0,10)
    }

    const getComponent=(animal:string)=>{
        return (
            <ComponentContainer key={animal}>
                <h2>{animal}</h2>
                {getUsersForAnimalUpToTen(animal).map(user=>getSubComponent(user))}
            </ComponentContainer>
        )
    }

    const getSubComponent=(user:IUser)=>{
        return (
            <SubComponentContainer key={user.id}>
                <div>{user.name.given}{' '}{user.name.surname}</div>
                <div>{user.points}{' pts'}</div>
            </SubComponentContainer>
        )
    }

    return (
        <AppContainer>
            <h1>Animals lovers blog</h1>
            {availableAnimals.map(animal=>getComponent(animal))}
        </AppContainer>
    )
}

const AppContainer=styled.div`
font-family:sans-serif;
`

const SubComponentContainer=styled.div`
display:flex;
justify-content:space-between;
`

const ComponentContainer=styled.div`
width:fit-content;
min-width:300px;
`