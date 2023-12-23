import Layout from '../components/Layout';
import { useState } from 'react';
import md5 from 'md5';

import UserContext from '../components/UserContext'
import { useContext } from 'react';



export default function Profile() {
    const [newPassword, setNewPassword] = useState('');

    const { user, supabase } = useContext(UserContext);

    const getGravatarUrl = (email) => {
        const hash = md5(email.trim().toLowerCase());
        return `https://www.gravatar.com/avatar/${hash}`;
    };

    const updatePassword = async () => {
        try {
            if (user.app_metadata.provider === 'github') {
                throw new Error('Password cannot be changed for GitHub users.');
            }
            if (!newPassword) throw new Error('Please enter a new password.');
            const { error } = await supabase.auth.updateUser({
                password: newPassword
            });
            if (error) throw error;
            alert('Your password has been updated.');
            setNewPassword('');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <Layout
            title="Profile"
            description="User profile"
        >

            <h1 className="text-4xl font-bold my-4 text-center">Profile</h1>

            <div className="flex flex-col items-center justify-center">
                {user && (
                    <div className="w-full max-w-xs">

                        <div className="mb-4 text-center">
                            <img
                                src={getGravatarUrl(user.email)}
                                alt="Gravatar"
                                className="w-24 h-24 rounded-full mx-auto"
                            />
                            <h2 className="my-2">{user.email}</h2>
                        </div>

                        {user.app_metadata.provider !== 'github' && (
                            <div className="mb-4">
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    className="w-full px-3 py-2 border rounded"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <button
                                    onClick={updatePassword}
                                    className="w-full my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Change Password
                                </button>
                            </div>
                        )}

                        {user.app_metadata.provider === 'github' && (
                            <p className="text-center text-red-500">
                                Password change is not available for GitHub sign-ins.
                            </p>
                        )}

                    </div>
                )}
            </div>

        </Layout>
    );
}
