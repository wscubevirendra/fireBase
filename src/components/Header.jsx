import React, { useContext } from 'react'
import { MainContext } from '../pages/Context'
import { Link } from 'react-router-dom'


export default function Header() {
    const { user ,logout} = useContext(MainContext)
    console.log(user)
    return (
        <div className='w-full px-10 flex justify-between shadow-lg py-4'>
            <div className='text-3xl'>Logo</div>
            <ul className='flex text-2xl gap-10'>
                <li><Link to="/">Home</Link></li>
                {
                    user == null ?
                        <li><Link to="/login">Login</Link></li>
                        :
                        <>
                            <li><Link to="/add-quiz">Add Quiz</Link></li>
                            <li><Link to="/view-quiz">View Quiz</Link></li>
                            <li onClick={logout}>
                                <Link to="/login">Logout</Link>
                            </li>
                        </>

                }


            </ul>

        </div>
    )
}
