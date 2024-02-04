import { ReactNode } from 'react'
import { Segment } from './Segment'

import twitterSrc from '~/assets/landing/twitter.svg'
import supportSrc from '~/assets/landing/support.svg'

export const Footer = () => {
  return (
    <Segment
      hasGradientBg={true}
      width={'large'}
      alignCenter={true}
    >
      <div className="flex flex-row items-center justify-center py-16">
        <FooterIcon 
          icon={twitterSrc}
          title="Twitter"
          iconLink="https://twitter.com/PrimeStaked"
        />
        <FooterIcon 
          icon={supportSrc}
          title="Contact Support"
          iconLink="mailto:support@primestaked.com"
        />
      </div>
    </Segment>
  )
}

const FooterIcon = ({
  icon,
  title,
  iconLink
}: {
  icon: string,
  title: string,
  iconLink: string
}) => {
  return (
    <a href={iconLink} title={title} className="flex flex-col justify-center items-center bg-gray-850 mx-2 w-[60px] h-[60px] rounded-full">
      <img alt={title} src={icon} height={40} width={40} />
    </a>
  )
}

