import { useEffect } from 'react';
import { useHub } from 'contexts/Hub';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts/Auth';

function Create() {
  const [{rooms = []}, send] = useHub()
  const { username } = useAuth()
  const {register, handleSubmit, formState, getValues} = useForm({
    resolver: (data) => {
      if (rooms.includes(data.name)) {
        return {
          values: data,
          errors: {
            name: "Room name is already taken, please choose another."
          }
        }
      }
      return {
        values: data,
        errors: {}
      }
    }
  })
  const navigate = useNavigate()

  useEffect(function redirect() {
    if (formState.isSubmitSuccessful && rooms.includes(getValues("name"))) {
      navigate("/" + getValues("name"))
    }
  }, [formState, navigate, getValues, rooms])

  return <div>
    <form onSubmit={handleSubmit((data) => send({ type: 'create', payload: {
      ...data,
      hostname: username
    }}))}>
      <input {...register("name")} placeholder="Room Name"/>
      {formState.errors.name && <p>{formState.errors.name}</p>}
      <input type="submit" />
    </form>
    <pre>{JSON.stringify(formState.errors, null, 2)}</pre>
  </div>
}
export default Create