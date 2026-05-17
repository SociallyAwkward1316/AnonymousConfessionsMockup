import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export function SignUp () {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const navigate = useNavigate()


    function handleSubmit () {
        if (password === password2 && email !== "" && username !== "") {
            const userInfo = {userId:Date.now(), username:{username}, email:{email}, password:{password}}
            localStorage.setItem("userInfo",JSON.stringify(userInfo))
            navigate("/postfeed")
        }
        
    }

    return (
        <div className="h-screen w-screen flex items-center justify-center bg-black px-4">
            
            <div className="flex flex-col items-center gap-4 w-full max-w-md">

                <h1 className="text-4xl text-white font-semibold text-center">
                    Create Account
                </h1>

                <h3 className="text-xl text-white/60 text-center">
                    Sign In to share your voice. Remain Anonymous. Tell your darkest secrets.
                </h3>

                <div className="w-full flex flex-col gap-2">
                    <label className="text-white/70 text-sm">Username:</label>
                    <input
                        placeholder="Username"
                        type="text"
                        className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/40 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 transition"
                        onChange={(e)=> {setUsername(e.target.value)}}
                    />
                </div>

                <div className="w-full flex flex-col gap-2">
                    <label className="text-white/70 text-sm">Email:</label>
                    <input
                        placeholder="Email"
                        type="text"
                        className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/40 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 transition"
                        onChange={(e)=> {setEmail(e.target.value)}}
                    />
                </div>

                <div className="w-full flex flex-col gap-2">
                    <label className="text-white/70 text-sm">Password:</label>
                    <input
                        placeholder="Password"
                        type="password"
                        className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/40 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 transition"
                        onChange={(e)=> {setPassword(e.target.value)}}
                    />
                </div>

                <div className="w-full flex flex-col gap-2">
                    <label className="text-white/70 text-sm">Confirm Password:</label>
                    <input
                        placeholder="Confirm Password"
                        type="password"
                        className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/40 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 transition"
                        onChange={(e)=> {setPassword2(e.target.value)}}
                    />
                </div>

                <button 
                onClick={handleSubmit}
                className="w-full mt-4 py-3 rounded-lg bg-white text-black font-medium hover:bg-white/90 active:scale-[0.98] transition">
                    Sign Up!
                </button>


                <Link className="text-xl text-white" to="/login">Login</Link>

            </div>
        </div>
    )
}