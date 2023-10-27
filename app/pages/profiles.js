import React from 'react';
import Header from '../components/header';


export default function Profile({profile}) {
    return (
        <div>

            <Header />
            {profile ? (
                <div>
                <p>username : {profile.username}</p>
                <p>email : {profile.email}</p>
                </div>
             ) : (
                <p>Wait...</p>
            )}
        </div>
    );
}

export async function getServerSideProps() {
    const response = await fetch('https://localhost:3000/api/profile');
    if(response.status == 200) {
        const profile = await response.json();
        return {props:{profile}};
    }
    else {
        return {props : {}};
    }
    
}
