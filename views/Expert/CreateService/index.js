import React, { useCallback, useEffect, useState } from 'react'
import Accordion from '../../../components/Accordion'
import ServiceTypeCard from './ServiceTypeCard'
import ScheduleSelector from './ScheduleSelector'
import FeesSelector from './FeesSelector'
import AudienceSelector from './AudienceSelector'
import UpperForm from './UpperForm'
import AllowRecording from './LiveServiceFormComponents/Recording&LearnerName/AllowRecording'
import ShowFullName from './LiveServiceFormComponents/Recording&LearnerName/ShowFullName'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { EXPERT } from '../../../constants'
import { PrimaryButton } from '../../../components/Buttons/Index'
import IsGroupContainer from './LiveServiceFormComponents/isGroup/Index'
import IsPrivateContainer from './LiveServiceFormComponents/IsPrivate/Index'
import QuestionFees from './LiveServiceFormComponents/QuestionFees/Index'
import { createService } from '../../../services/services'

const SectionTitle = ({ children }) => (
  <h3 className="text-lg text-primary mb-2">{children}</h3>
)

const Index = () => {
  const [type, setType] = useState(null)
  const [liveType, setLiveType] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [weekDays, setWeekDays] = useState('null')
  const [startTimeHour, setStartTimeHour] = useState('')
  const [startTimeMin, setStartTimeMin] = useState('')
  const [startTimeStamp, setStartTimeStamp] = useState(null)
  const [duration, setDuration] = useState('')
  const [fees, setFees] = useState('')
  const [activeAgeGroup, setActiveAgeGroup] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [milestoneData, setMileStoneData] = useState([])
  const [serviceFreq, setServiceFreq] = useState('per day')
  const [paymentFreq, setPaymentFreq] = useState('per day')
  const [allowRecording, setAllowRecording] = useState('no')
  const [showFullName, setShowFullName] = useState('no')
  const [isGroup, setIsGroup] = useState('no')
  const [isPrivate, setIsPrivate] = useState('no')
  const [questionFee, setQuestionFee] = useState('')
  const [allowQuestion, setAllowQuestion] = useState('no')
  const [files, setFiles] = useState([])

  const router = useRouter()
  const userType = useSelector((state) => state.app.userType)

  if (startDate) {
    console.log('createService startDate ', startDate)
  }
  if (endDate) {
    console.log('createService endDate ', endDate)
  }

  const verifyUserType = useCallback(() => {
    if (userType === EXPERT) {
      return true
    } else {
      return false
    }
  }, [userType])

  useEffect(() => {
    if (!verifyUserType()) {
      router.push('/dashboard')
    }
  }, [verifyUserType])

  const [serviceType, setServiceType] = useState(null)

  const activeGroupChangeHandler = (ageGroup) => setActiveAgeGroup(ageGroup)

  const continueClickedHandler = () => {
    const formData = {
      title: title,
      description: description,
      category: null,
      languages: ['en'],
      type: type,
      is_group: `${isGroup === 'yes' ? 'true' : 'false'}`,
      is_private: `${isPrivate === 'yes' ? 'true' : 'false'}`,
      live_type: liveType,
      cost: fees,
      session_type: `${
        serviceFreq === 'per day'
          ? 'daily'
          : serviceFreq === 'per week'
          ? 'weekly'
          : 'monthly'
      }`,
      payment_type: `${
        paymentFreq === 'per day'
          ? 'daily'
          : paymentFreq === 'per week'
          ? 'weekly'
          : 'monthly'
      }`,
      allow_questions: `${allowQuestion === 'yes' ? 'true' : 'false'}`,
      question_fee: `${questionFee}`,
      allow_subscribe: false,
      duration: `${duration}`,
      allow_recording: `${allowRecording === 'yes' ? 'true' : 'false'}`,
      allow_visible_user_names: `${showFullName === 'yes' ? 'true' : 'false'}`,
      start_at: `${startDate !== null && startDate.toISOString()}`,
      end_at: `${endDate !== null && endDate.toISOString()}`,
      // start_at: `${
      //   startDate.slice(11, 15) +
      //   '-' +
      //   startDate.slice(56, 58) +
      //   '-' +
      //   startDate.slice(8, 10) +
      //   'T02:08:00Z'
      // }`,
      // end_at: `${
      //   endDate.slice(11, 15) +
      //   '-' +
      //   endDate.slice(56, 58) +
      //   '-' +
      //   endDate.slice(8, 10) +
      //   'T02:08:00Z'
      // }`,
      // Wed Nov 18 2020 12:00:00 GMT+0530 (India Standard Time) 11
      // start_at: '2020-10-16T02:08:00Z',
      // end_at: '2020-10-24T02:08:00Z',
      age_group: `${activeAgeGroup}`,
    }

    createService(formData, milestoneData, files)
    // dispatch(createMilestone(milestoneData))
    // createMilestone(milestoneData)
    //   .then((res) => console.log(res))
    //   .catch((e) => console.log(e))
  }

  return (
    <div className="w-full">
      <h3 className="text-2xl text-primary mb-4">Create new service</h3>
      <div className="border-2 border-highlight bg-white rounded-sm p-6">
        <Accordion id="details" label="Service details">
          {/* TODO: Language selection */}

          <SectionTitle>Service type</SectionTitle>
          <div className="w-full grid grid-cols-2 gap-5 mb-6">
            <ServiceTypeCard
              label="Live"
              active={serviceType === 0}
              clickHandler={() => {
                setType('live')
                setStartDate(null)
                setEndDate(null)
                setServiceType(0)
                setPaymentFreq(null)
              }}
            />
            <ServiceTypeCard
              label="Rich media"
              active={serviceType === 1}
              clickHandler={() => {
                setType('rich')
                setStartDate(null)
                setEndDate(null)
                setServiceType(1)
                // setLiveType(null)
                setServiceFreq(null)
              }}
            />
          </div>
          <UpperForm
            title={title}
            titleChangedHandler={(value) => setTitle(value)}
            typeChangedHandler={(type) => setLiveType(type)}
            description={description}
            descriptionChangedHandler={(value) => setDescription(value)}
            type={serviceType === 0 ? 'live' : 'media'}
            imageInputChangeHandler={(data) => {
              const newFile = [...files]
              newFile.push(data)
              setFiles(newFile)
            }}
            imageDataForPreview={files}
            imageCrossHandler={(index) => {
              const newFile = [...files]
              newFile.splice(index, 1)
              setFiles(newFile)
            }}
          />
        </Accordion>

        <Accordion id="schedule" label="Service schedule">
          <ScheduleSelector
            startDate={startDate}
            startDateChangeHandler={(value) => setStartDate(value)}
            endDate={endDate}
            endDateChangeHandler={(value) => setEndDate(value)}
            hour={startTimeHour}
            min={startTimeMin}
            hourChangedHandler={(value) => setStartTimeHour(value)}
            minChangedHandler={(value) => setStartTimeMin(value)}
            timeStampChangedHandler={(value) => setStartTimeStamp(value)}
            weekDaysChangedHandler={(value) => setWeekDays(value)}
            duration={duration}
            durationChangedHandler={(value) => setDuration(value)}
            type={serviceType}
            setMilestoneData={(data) => setMileStoneData(data)}
            serviceFreq={serviceFreq}
            setServiceFreq={setServiceFreq}
            paymentFreq={paymentFreq}
            setPaymentFreq={setPaymentFreq}
          />
        </Accordion>

        <Accordion id="fees" label="Fees">
          <FeesSelector
            fees={fees}
            feesChangedHandler={(value) => setFees(value)}
          />
          <QuestionFees
            value={questionFee}
            changeHandler={setQuestionFee}
            allowQuestions={allowQuestion}
            allowQuestionChangeHandler={setAllowQuestion}
          />
        </Accordion>

        <Accordion id="audience" label="Audience">
          <AudienceSelector
            activeAgeGroup={activeAgeGroup}
            ageGroupChangeHandler={activeGroupChangeHandler}
          />
        </Accordion>

        <div className="flex gap-4">
          <AllowRecording
            activeLabel={allowRecording}
            setLabel={setAllowRecording}
          />
          <ShowFullName activeLabel={showFullName} setLabel={setShowFullName} />
        </div>

        <div className="flex gap-4 mt-4">
          <IsGroupContainer activeLabel={isGroup} setLabel={setIsGroup} />
          <IsPrivateContainer activeLabel={isPrivate} setLabel={setIsPrivate} />
        </div>
        <div className="w-4/12 mt-10">
          <PrimaryButton
            label="Continue"
            clickHandler={continueClickedHandler}
          />
        </div>
      </div>
    </div>
  )
}

export default Index
