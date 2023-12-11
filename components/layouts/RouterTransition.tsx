'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { NavigationProgress, nprogress } from '@mantine/nprogress';

export function RouterTransition() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = `${pathname}?${searchParams}`
    console.log(url)
    nprogress.start()
    nprogress.complete()
    // You can now use the current URL
    // ...
  }, [pathname, searchParams])

  return <NavigationProgress zIndex={9999999} />

}