import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/useHttp'
import {AuthContext} from '../context/contexthook'
import { LinksList } from '../components/LinksList'

export const LinkPage = () => {
  const {token} = useContext(AuthContext)
  const {request} = useHttp()
  const [links, setLinks] = useState(null)

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request(`api/link/`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setLinks(fetched)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    fetchLinks()
  }, [fetchLinks])


  return (
    <>
      { links && <LinksList links={links} /> }
    </>
  )
}