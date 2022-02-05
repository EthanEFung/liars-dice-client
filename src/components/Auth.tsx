import { useForm } from 'react-hook-form';
import { useAuth } from 'contexts/Auth';
function Auth() {
  const { setUsername } = useAuth()
  const { register, handleSubmit } = useForm()
  return <div>
    <form onSubmit={handleSubmit((data) => setUsername(data.username))} >
      <input {...register('username')} placeholder='username'></input>
      <input type="submit"></input>
    </form>
  </div>
}

export default Auth;
