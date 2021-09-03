import React, { useMemo, useCallback } from 'react'
import styled from 'styled-components'
import { users } from '../../assets'

/**
 * the shape of a user from users
 */
interface IUser {
    id: string
    name: {
        given: string
        surname: string
    }
    points: number
    /**
     * list of animals that user love
     */
    animals: string[]
    isActive: boolean
    age: number
}

interface IAppProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * the animal lovers blog app
 * @param {IAppProps} props
 * @returns {React.ReactElement}
 */
const App: React.FC<IAppProps> = ({ ...props }): React.ReactElement => {
    /**
     * list of animals that users love
     */
    const listOfAnimals = useMemo(() => {
        const animals: string[] = []
        users.forEach((user) => {
            user.animals.forEach((animal) => {
                if (!animals.find((animal_) => animal === animal_)) {
                    animals.push(animal)
                }
            })
        })
        return animals
    }, [users])

    /**
     * gets a list of users that loves some animal
     * @param {string} animal the animal for which we are looking users
     * @returns {IUser[]} a list of up to ten users, ordered in descending order respect to points of each user
     */
    const getUsersForAnimalUpToTen = useCallback(
        (animal: string) => {
            const usersPerAnimal: IUser[] = []
            users.forEach((user) => {
                if (user.isActive) {
                    if (user.animals.find((animal_) => animal === animal_)) {
                        usersPerAnimal.push(user)
                    }
                }
            })
            return usersPerAnimal
                .sort((a, b) => b.points - a.points)
                .slice(0, 10)
        },
        [users]
    )

    /**
     * gets the rendered content on the page per user
     * @param {IUser} user a user
     * @returns {JSX.Element}
     */
    const getUserBlock = useCallback(
        (user: IUser) => (
            <UserBlockContainer key={user.id}>
                <div>
                    {user.name.given} {user.name.surname}
                </div>
                <div>
                    {user.points}
                    {' pts'}
                </div>
            </UserBlockContainer>
        ),
        []
    )

    /**
     * gets the rendered content on the page per animal
     * @param {string} animal an animal that users love
     * @returns {JSX.Element}
     */
    const getAnimalBlock = useCallback(
        (animal: string) => (
            <AnimalBlockContainer key={animal}>
                <h2>{animal}</h2>
                {getUsersForAnimalUpToTen(animal).map((user) =>
                    getUserBlock(user)
                )}
            </AnimalBlockContainer>
        ),
        [getUsersForAnimalUpToTen, getUserBlock]
    )

    return (
        <AppContainer {...props}>
            <h1>Animals lovers blog</h1>
            {listOfAnimals.map((animal) => getAnimalBlock(animal))}
        </AppContainer>
    )
}

export default App

const AppContainer = styled.div`
    font-family: sans-serif;
`

/**
 * display items in a row
 */
const UserBlockContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const AnimalBlockContainer = styled.div`
    width: fit-content;
    min-width: 300px;
`
