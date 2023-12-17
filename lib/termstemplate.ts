import { TermsProps } from '@/components/TermsOfUseGenerator';
import endent from 'endent';

export const termsPolicyAssistant = endent`You are a legal expert. 
  Generate a complete, highly detailed and professional Terms & Conditions Policy using the questions and answers submitted by the user. 
  The policy must have 2000 words at minimum.
`;

export const termsPolicyTemplate = (data: TermsProps) => endent`
1. Where will your Terms & Conditions be used?
- ${data.platform.join(', ')}

${
  data.platform.includes('website')
    ? `1.1. What is your website URL?
- ${data.url}
`
    : ''
}
${
  data.platform.includes('website')
    ? `1.2. What is your website name
- ${data.websitename}
`
    : ''
}
${
  data.platform.includes('app')
    ? `1.3. What is your app name?
- ${data.appname}
`
    : ''
}
2. Entity type (only one)
- ${data.entity}
${data.entity === 'business' && data.businessname.length > 0 ? `Business Name: ${data.businessname}` : ''}
${data.entity === 'business' && data.businessaddress.length > 0 ? `Business Address: ${data.businessaddress}` : ''}
${
  data.entity === 'business'
    ? `Add the Limitation Of Liability
Unless prohibited by law, you shall indemnify and hold harmless our officers, directors, employees, and agents from any and all indirect, punitive, special, incidental, or consequential damages, however caused (including without limitation, attorneys' fees and related costs and expenses of arbitration, litigation, or trial, whether or not such proceedings are initiated), arising out of or in connection with this agreement, whether based on contract, negligence, or any other tortious action, including but not limited to any claims for personal injury or property damage. This indemnification extends to any violation by you of any federal, state, or local laws, statutes, rules, or regulations. In the event of any liability on our part, it shall not exceed the amount paid for the products/services and shall not include consequential or punitive damages. It is important to note that some states may not allow the limitation or exclusion of punitive, incidental, or consequential damages, making the above limitation or exclusion invalid.
`
    : ''
}

3. What is your Country
- ${data.country}

4. Can users create accounts?
- ${data.createaccounts}
${
  data.createaccounts
    ? `Account Termination
The account can be terminated or suspended and access to the service can be blocked immediately, without prior notice or liability, at our own discretion, for any reason whatsoever and without any limitations, including but not limited to a violation of the terms.

In the event that you decide to end your account, you can simply stop using the Service.

Under our sole discretion, we reserve the right to suspend or terminate your account and restrict access to the Service immediately and without prior notice or liability for any reason, including but not limited to a violation of the Terms with no limitations.

Communications
Upon registering an account on our Service, you consent to receiving newsletters, marketing or promotional materials and any other related information that we may send. Please note that you reserve the option to opt out of receiving some, or all, of these communications from us by visiting the unsubscribe link or reaching out to us via email at ${data.contactbyemail.value}.`
    : ''
}

5. Can users create and/or upload content (i.e. text, images)?
- ${data.uploadcontent}

6. Can users buy goods (products, items)?
- ${data.buygoods}

7. Do you offer subscription plans?
- ${data.subscriptions}

7.1 Do you offer free trials?
- ${data.freetrials}

7.2. Do you offer free plans?
- ${data.freeplan}

8. Do you offer refunds?
- ${data.refunds}
${
  data.refunds === 'Yes' &&
  `8.1 How many days customers have to ask for a refund? Please note that you need to select a minimum of 14 days for EU-based businesses.
  - Refunds time: ${data.refundstime}`
}

${
  data.refunds === 'Yes' &&
  `8.2 Can customers exchange a product with a new one?
  - ${data.refundschanges}`
}

${
  data.refunds === 'Yes' &&
  `8.2 Can customers exchange a product with a new one?
  - ${data.refundschanges}`
}

${
  data.refunds === 'Yes' &&
  `8.3 What are the conditions that must be met to issue a refund?
  - ${data.refundsconditions.join(', ')}`
}

8. Do you want to make it clear that your own content & trademarks are your exclusive property?
- ${data.rights === 'Yes' ? 'Yes, our content (logo, visual design, trademarks etc.) is our exclusive property' : 'No'}
${
  data.rights === 'Yes'
    ? `
Copyright Policy
Our commitment to upholding intellectual property rights is paramount. As such, we will promptly address any claims of Infringement regarding Content posted on the Service.

In the event that you are in possession of copyrighted material, or authorized on behalf of the owner, and you suspect that such material has been copied in a manner that violates copyright law, kindly send your claim via email to ${
        data.contactbyemail.value
      }. Please make the subject of your email to be "Copyright Infringement" and provide a thorough explanation of the alleged infringement as outlined in the "DMCA Notice and Procedure for Copyright Infringement Claims" section below.

The user shall be liable for any damages (including legal fees and expenses) resulting from false statements or malicious accusations regarding the infringement of any content accessed through the Service, with respect to their copyrights.

DMCA Notice and Procedure for Copyright Infringement Claims
A notification related to the Digital Millennium Copyright Act (DMCA) can be submitted by furnishing our Copyright Agent with the subsequent details in writing (kindly refer to 17 U.S.C 512(c)(3) for more information):

a signature, whether physical or electronic, of an authorized person acting on behalf of the copyright owner's interests;
a description of the licensed material that is believed to have been violated must be provided, including the URL (i.e., web page address) of where the licensed material is located or a copy of it;
identification of the URL or other specific location on the Service where the material being contested is located;
contact details including your postal address, phone number, and email address;
a statement indicating a belief made in good faith that the contested usage is not authorized by the copyright holder, their representative, or by law;
a statement made under penalty of perjury, affirming that the aforementioned information within the notice is precise and that the individual making the statement is either the copyright owner or has been authorized to act on behalf of the copyright owner.
${data.contactbyemail.value.length > 0 ? `Our Copyright Agent can be contacted through email at ${data.contactbyemail.value}` : ''}`
    : ''
}
9. If users provide you feedback & suggestions, do you want to use this feedback without compensation or credits given?
- ${data.feedbackcompensation === 'Yes' ? 'Yes, we may implement any feedback or suggestions we receive' : 'No'}

10. Do you plan to offer promotions, contests, sweepstakes?
- ${data.promotions}


11. Do you allow minors under 18 years to use the platform?
- ${data.minors}

${
  data.createaccounts === 'Yes' && data.minors === 'No'
    ? `Accounts
Upon registering an account with us, you affirm that you are over 18 years of age, and that all information you provide us is truthful, comprehensive, and up-to-date at all times. Providing erroneous, incomplete, or outdated information may lead to prompt termination of your Service account.

As a user, it is your duty to ensure the privacy of your account information, including but not limited to restricting unauthorized access to your computer and/or account. You are liable and accountable for all activities or actions carried out under your account and/or password, irrespective of whether your password is with our service or a third-party one. You must inform us instantly when you become aware of any security breach or suspicious use of your account.

It is prohibited to use a username that infringes upon the rights of others, including the name of a person, entity, or trademark that is not legally available for use without proper authorization. Additionally, the use of any username that can be considered offensive, vulgar, or obscene is strictly forbidden. This complies with the terms of service.

We retain the privilege to decline service, conclude accounts, eliminate or alter content, or withdraw orders at our exclusive discretion.`
    : ''
}

12. Implement Fair Usage Policy (FUP)

13. Prohibited Uses
You are permitted to utilize the Service solely for lawful purposes and in compliance with the Terms. You pledge not to utilize the Service in the following ways:

In any manner that contravenes any relevant national or international law or regulation.

For the purpose of exploiting, harming or attempting to exploit or harm minors in any way by exposing them to unsuitable content or otherwise.

It is prohibited to send or facilitate the sending of any promotional or advertising materials, which may include but not limited to, "spam", "junk mail", "chain letter", or any other solicitation of such nature.

To impersonate or attempt to impersonate the organization, an organization employee, another user, or any other individual or entity.

In no circumstances that violate the rights of others, or in any way constitute illegality, threat, fraudulence, or harm, or in association with any wrongdoing, unlawful, fraudulent, or harmful intention or pursuit.

To partake in any activity that limits or hinders the use or pleasure of the Service by anyone, or that, as determined by us, has the potential to cause harm or offense to the Company or users of the Service, or may subject them to legal responsibility.

The service provider we use, "Open AI," strictly prohibits the production of sexual, religious, or political content. Therefore, we also prohibit the generation of such content on our platform. Generating such content will result in an "Unsafe Content" error message, which will serve as a final warning. Any further attempts to generate such material will lead to immediate cancellation of your subscription, and you will be prohibited from using our services again. No refunds will be issued in such cases.

Furthermore, you acknowledge and consent not to:

- You may not utilize the Service in a way that could cause the Service to become inoperable, overloaded, harmed, or impaired, or disrupt any other user's ability to engage in real-time activities through the Service.
- Do not utilize any machine, spider, or other automated tool, procedure, or mechanism to gain entry to the Service for any reason, including but not limited to tracking or duplicating any of the content on the Service.
- Engage in any manual or automated process to monitor, replicate, or reproduce any of the content available on the Service, or for any other unauthorized purposes, without obtaining our prior written consent.
- Utilize any equipment, program, or method that hinders the appropriate operation of the Service.
- Introduce any harmful software, including but not limited to viruses, trojan horses, worms, logic bombs, or any other harmful materials or technology. This action is strictly prohibited and violates our terms of use.
- Do not make any attempt to gain illicit access, interfere with, cause damage, or disrupt any portions of the Service, the server where the Service is kept, or any servers, computers, or databases connected to the Service.
- Engage in Service Disruption through a Denial-of-Service Attack or Distributed Denial-of-Service Attack.
- Engage in any activity that can harm or manipulate the Company's reputation.
- Otherwise attempt to disrupt the appropriate functioning of the Service.

14. Unauthorized Sale of Coupons
We strictly prohibit the unauthorized sale, resale, or distribution of any coupons or discounts related to our SaaS platform. This includes, but is not limited to, the sale of coupons by third-party websites or individuals without explicit authorization from our company.

Any coupons obtained through unauthorized channels are considered null and void. We reserve the right to refuse redemption of such coupons or take any necessary legal action to protect our interests.

Our company is the sole authorized entity for creating, distributing, and managing coupons for our SaaS platform. Only coupons obtained directly from our official website, authorized partners, or through our designated referral or affiliate programs are considered valid.

We encourage our users to report any instances of unauthorized coupon sales and cooperate with us in investigating and resolving such matters. By using our service, you agree not to engage in the sale or purchase of unauthorized coupons related to our SaaS platform.

Violation of this clause may result in the termination or suspension of your account, as well as legal action to seek appropriate remedies. We reserve the right to update or modify this clause at any time without prior notice.


16. Add the Disclaimer Of Warranty

The services shall be provided by the company on a "as is" and "as available" basis. The company shall not make any representations or warranties, whether express or implied, regarding the operation of the services or the adequacy, accuracy, completeness, or reliability of the information, content, or materials included in the services. By availing of these services, you explicitly agree that any risk arising from your use of the services, their content, and any services or items procured from the company shall be borne solely by you.

The company and all individuals or entities affiliated with the company do not provide any guarantees or assurances regarding the entirety, security, dependability, eminence, precision, or accessibility of the services. Furthermore, the company and any associated personnel do not assert or warrant that the services, their content, or any services or materials procured through the services will be exact, dependable, mistake-free, or uninterrupted. There is no guarantee that blemishes will be remedied, that the services or the server that enables them to be available is free of viruses or other malicious constituents, or that the services or any services or materials procured through the services will fulfill your requirements or expectations.

The party involved hereby disavows any and all forms of guarantees, whether explicitly stated or tacitly understood, as required by law or otherwise, which may include but not be limited to guarantees of product quality, absence of third-party rights infringements, and suitability for specific uses.

Any such exclusions or limitations shall not impact any warranties that are not allowed to be excluded or limited by the applicable law.

17. Changes To Service
The right to withdraw or modify our Service, as well as any service or material we provide through it, is reserved at our own discretion without prior notice. We will not be held accountable if, for any reason, the Service or any portion thereof is unavailable at any given moment. We may periodically limit access to users, including registered users, to certain portions or the entire Service.

18. Amendments To Terms
The amended Terms may be posted on this site at any time, and it is your obligation to periodically review them.

The ongoing utilization of the Platform after the publication of modified Terms entails your acceptance and consent to the alterations. It is your responsibility to regularly review this page to remain informed about any updates, as they are obligatory for you.

Upon the implementation of any revisions, your access to or use of our Service constitutes acceptance of the amended terms. Non-acceptance of the updated terms relinquishes your authorization to use the Service.

19. Waiver And Severability
Any failure by the Company to enforce any provision of these Terms shall not constitute a waiver of such provision or any other provision. Moreover, the Company's failure to assert any right or provision under these Terms shall not constitute a waiver of such right or provision.

In the event that any section of the Terms is determined by a court or other appropriate authority to be invalid, unlawful, or unenforceable for any reason, that particular section will be removed or restricted to the minimum extent necessary, while the remaining sections of the Terms will remain fully valid and enforceable.

20. Acknowledgement
By utilizing the services or any other offerings provided by us, it is understood that you have familiarized yourself with and accepted these terms of use as legally binding.

21. How can users contact you for any questions regarding your Privacy Policy?
${data.contactbyemail.active && data.contactbyemail.value.length > 0 ? `- By email (${data.contactbyemail.value})` : ''}
${
  data.contactbywebsite.active && data.contactbywebsite.value.length > 0 ? `- By visiting a page on our website (${data.contactbywebsite.value})` : ''
}
${data.contactbyphone.active && data.contactbyphone.value.length > 0 ? `- Phone number (${data.contactbyphone.value})` : ''}
${data.contactbypostmail.active && data.contactbypostmail.value.length > 0 ? `- By sending post mail (${data.contactbypostmail.value})` : ''}

`;
