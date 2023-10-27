import { fetchServerResponse } from "next/dist/client/components/router-reducer/fetch-server-response";

export default function Profile() {
    return (
        <div>

            <Header />
            {profile ? {
                <div>
                <p>username : {profile.username}</p>
                <p>email : {profile.email}</p>
                </div>
            } : {
                <p>Wait...</p>
            }}
        </div>
    );
}

export async function getServerSideProps() {
    const response = await fetch('https://localhost:3000/api/profile');
    if(response.status ==200) {
        const profile = await response.json();
        return {props:{profile}};
    }
    else {
        return {props : {}};
    }
    
}

export default Profile;