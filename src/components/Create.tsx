import { useHubDispatch } from 'contexts/Hub';
import React from 'react';
import { useForm } from 'react-hook-form'
import { useGoSocket } from '../contexts/GoSocket';
import useWS from '../hooks/useWS';
function Create() {
  const send = useHubDispatch()
  const {register, handleSubmit} = useForm()
  return <div>
    <form onSubmit={handleSubmit((data) => send({ type: 'create', payload: data}))}>
      <input {...register("name")} placeholder="Room Name"/>
      <input {...register("hostname")} placeholder="Host Name"/>
      <input type="submit" />
    </form>
  </div>
}
export default Create