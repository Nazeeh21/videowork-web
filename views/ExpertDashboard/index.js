import React, { useState, useEffect } from 'react'
import CompactServiceCard from '../../components/Cards/CompactServiceCard/CompactServiceCard'
import SearchBar from '../../components/Inputs/SearchBar'
import { CardFilledWithImage } from '../../components/Cards/Cards'
import { ViewMoreButton } from '../../components/Buttons/Index'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchProviderService,
  fetchServices,
} from '../../store/actions/appActions'

const Index = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [query, setQuery] = useState('')

  let services = useSelector((state) => state.app.providerService)
  const providerId = useSelector((state) => state.app.providerId)
  const currentProfileId = useSelector((state) => state.app.currentProfile)
  const token = useSelector((state) => state.auth.token)
  const nextUrl = useSelector((state) => state.app.nextProviderServiceUrl)
  const previousUrl = useSelector(
    (state) => state.app.previousProviderServiceUrl
  )

  const handleCategoriesRedirect = () => {
    router.push('/search')
  }

  useEffect(() => {
    if (!nextUrl && !previousUrl) {
      dispatch(fetchProviderService(providerId, token, currentProfileId))
    }
  }, [services])

  console.log('profileId', currentProfileId)

  const viewMoreClickHandler = () => {
    dispatch(fetchProviderService(providerId, token, currentProfileId, nextUrl))
  }

  return (
    <React.Fragment>
      <div className="grid grid-cols-2 w-full">
        <h3 className="text-2xl mb-6 ">Active services</h3>
        <div className="justify-self-end">
          <SearchBar value={query} changeHandler={(val) => setQuery(val)} />
        </div>
      </div>

      {services.map((service) => (
        <CompactServiceCard
          buttonClickHandler={() => router.push(`/view-service/${service.pk}`)}
          key={service.pk}
          category={service.category}
          languages={service.languages}
          descriptionText={service.description}
          paymentType={service.payment_type}
          servicePk={service.pk}
        />
      ))}
      {nextUrl && (
        <div className="m-auto w-2/12">
          <ViewMoreButton clickHandler={viewMoreClickHandler} />
        </div>
      )}
      <h3 className="text-2xl mb-6">Trending services</h3>
      <div className="grid grid-flow-row grid-cols-2 w-full gap-6 mb-6">
        <CardFilledWithImage
          clickHandler={handleCategoriesRedirect}
          src="/stock/music.jpg"
          title="Music"
          subTitle="234 learners"
        />
        <CardFilledWithImage
          clickHandler={handleCategoriesRedirect}
          src="/stock/dance.jpg"
          title="Dance"
          subTitle="658 learners"
        />
        <CardFilledWithImage
          clickHandler={handleCategoriesRedirect}
          src="/yoga.jpg"
          title="Yoga"
          subTitle="461 learners"
        />
        <CardFilledWithImage
          clickHandler={handleCategoriesRedirect}
          src="/stock/photography.jpg"
          title="Photography"
          subTitle="137 learners"
        />
      </div>
      <div className="m-auto w-2/12">
        <ViewMoreButton clickHandler={() => router.push('/services')} />
      </div>
    </React.Fragment>
  )
}

export default Index
