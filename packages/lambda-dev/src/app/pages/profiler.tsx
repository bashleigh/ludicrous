import {
  Accordion,
  Badge,
  FlexContainer,
  Label,
  Loader,
  MainContainer,
  NavResponsive,
  NavStateProvider,
  PageContainer,
  PageHeader,
  SecondaryNav,
  SecondaryNavContainer,
  SecondaryNavItem,
  Subtitle,
} from '@reapit/elements'
import React, { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import { methodToIntent, statusCodeToIntent } from '../utils'

const Profiler: FC<any> = () => {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      const response = await fetch('http://localhost:3000/api/profiler')

      setLoading(false)
      const result = await response.json()

      setEvents(result)
    }

    fetchEvents()
  }, [])

  return loading ? (
    <Loader />
  ) : (
    <>
      <Accordion
        items={events.reverse().map((event) => ({
          content: (
            <>
              <Subtitle>Event</Subtitle>
              <Label>Body</Label>
              <pre>{event.event?.body}</pre>
              <Label>Headers</Label>
              <pre>{JSON.stringify(event.event?.headers, undefined, 2)}</pre>
              <Subtitle>Response</Subtitle>
              <Label>Body</Label>
              <pre>{JSON.stringify(event.response?.body, undefined, 2)}</pre>
              <Label>Headers</Label>
              <pre>{JSON.stringify(event.response?.headers, undefined, 2)}</pre>
            </>
          ),
          title: `${event.event.path}`,
          titleItems: [
            <Badge intent={methodToIntent(event.event.httpMethod)}>{event.event.httpMethod}</Badge>,
            <Badge>{event.executionTime}</Badge>,
            <Badge intent={statusCodeToIntent(event.response.statusCode)}>{event.response.statusCode}</Badge>,
          ],
        }))}
      />
    </>
  )
}

export default () => (
  <NavStateProvider>
    <MainContainer>
      <NavResponsive options={[]} />
      <FlexContainer isFlexAuto>
        <SecondaryNavContainer>
          <SecondaryNav>
            <SecondaryNavItem
              active
            >
              <Link href="/profiler">Profiler</Link>
            </SecondaryNavItem>
            <SecondaryNavItem
            >
              <Link href="/profiler/routes">Routes</Link>
            </SecondaryNavItem>
          </SecondaryNav>
        </SecondaryNavContainer>
        <PageContainer className="el-hfull">
          <PageHeader
            pageTitle={{
              children: 'Profiler',
              hasBoldText: true,
            }}
          />
          <Profiler />
        </PageContainer>
      </FlexContainer>
    </MainContainer>
  </NavStateProvider>
)
