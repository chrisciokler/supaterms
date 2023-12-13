import { PrivacyProps } from '@/components/PrivacyPolicyGenerator';
import endent from 'endent';

export const privacyPolicyAssistant = endent`You are a legal expert. 
  Generate a 2000 words complete, highly detailed and professional Privacy and Cookies Policy using the questions and answers submitted by the user. 
  The policy must have 2000 words at minimum. 
  Include provisions for GDPR, CCPA, CPRA complete text in the policy.
`;

export const privacyPolicyTemplate = (data: PrivacyProps) => endent`
1. Where will your Privacy Policy be used?
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

3. What is your Country
- ${data.country}

${
  data.informationCollected.length > 0
    ? `4. What kind of personal information do you collect from users?
- ${data.informationCollected.join(', ')}

Use of Data
The collected data is used for various purposes:

To provide and maintain our Service;
To notify you about changes to our Service;
To allow you to participate in interactive features of our Service when you choose to do so;
To provide customer support;
To gather analysis or valuable information so that we can improve our Service;
To monitor the usage of our Service;
To detect, prevent and address technical issues;
To fulfill any other purpose for which you provide it.
To fulfill our responsibilities and uphold our entitlements arising from any agreements made between yourself and us, which includes billing and collection purposes;
To notify you of any account or subscription related updates, such as expiration, renewal and email-instructions;
To keep you informed regarding any news, exclusive deals and general updates on our other products, services and events that are similar to your prior purchases or interests, unless you have chosen to opt-out of receiving such notifications.
We may use the information you provide in the ways we have described or for any other purpose with your explicit consent.

## Data Retention
Personal Data shall be kept by us for the duration of time that is required to achieve the goals stated in this Privacy Policy. We shall keep and use Personal Data only when necessary to satisfy our legal obligations, such as when we must retain your data to comply with the laws that are applicable at that time. We shall also reserve the right to keep your data for resolving disputes and enforcing our legal agreements and policies.

The Usage Data shall be stored for internal analytical purposes. In most cases, the Usage Data shall be stored for a brief period unless it is utilized for enhancing the security and functionality of the Service or when required by law to retain it for a longer duration.

## Transfer of Data
The information, such as Personal Data, may get transferred and maintained on computers situated outside of your jurisdiction including your state, province, country, or any other governmental jurisdiction. Such transfer might lead to the application of different data protection laws than those of your jurisdiction.

If your location is outside the United States and you decide to share information with us, it's important to know that we will transfer and process the data, including Personal Data, in the United States.

The user's consent to this Privacy Policy followed by their submission of such information represents their agreement to that transfer

The company will ensure that the user's data is handled securely and in compliance with the Privacy Policy. Personal Data will not be transferred to any organization or country without appropriate measures being taken to safeguard the user's data and other personal information.

## Disclosure of Data
The personal information collected or provided may be disclosed:

To comply with law enforcement requests.
As part of a business transaction, such as a merger, acquisition or asset sale involving us or our subsidiaries. In such cases, your personal data may be transferred.
In other instances, data disclosure may occur in the following circumstances:

To fulfill the intended purpose for which the information was provided;
or the purpose of featuring your organization's logo on our website;
or any other reason with your express consent.
Security of Data
Data security is a priority for us. However, it is important to note that no method of Internet transmission or electronic storage is entirely secure. We endeavor to use commercially viable methods to safeguard your Personal Data, but we cannot provide a definitive assurance of its complete security.`
    : ''
}

5. How can users contact you for any questions regarding your Privacy Policy?
${data.contactbyemail.active && data.contactbyemail.value.length > 0 ? `- By email (${data.contactbyemail.value})` : ''}
${
  data.contactbywebsite.active && data.contactbywebsite.value.length > 0 ? `- By visiting a page on our website (${data.contactbywebsite.value})` : ''
}
${data.contactbyphone.active && data.contactbyphone.value.length > 0 ? `- Phone number (${data.contactbyphone.value})` : ''}
${data.contactbypostmail.active && data.contactbypostmail.value.length > 0 ? `- By sending post mail (${data.contactbypostmail.value})` : ''}

## Include provisions for GDPR, CCPA, CPRA and other premium-only provisions

6. Do you use tracking and/or analytics tools, such as Google Analytics?
- ${data.trackingtools}

7. Do you send emails to users?
- ${data.sendemails}

8. Do you show ads?
- ${data.showads}

9. Can users pay for products or services?
- ${data.productsorservicespayment}

10.Do you use remarketing services for marketing & advertising purposes?
- ${data.remarketing}

11.Do you accept payments?
- ${data.acceptspayments}

${
  data.acceptspayments
    ? `
Payments
Paid products and/or services may be provided within our Service. In such cases, third-party services like payment processors may be used for payment processing.

We do not store or collect payment card details. Instead, our third-party payment processors collect this information, and their use of your personal information is regulated by their Privacy Policy. The payment processors follow the standards set by PCI-DSS, which is managed by the PCI Security Standards Council. This is a collaboration of brands such as Visa, Mastercard, American Express, and Discover. PCI-DSS requirements ensure that payment information is handled securely.`
    : ''
}

12. Do you want your Privacy Policy to include CCPA + CPRA wording?
- Yes. Adapt my Privacy Policy to include CCPA + CPRA wording

13. Do you want your Privacy Policy to include GDPR wording?
- Yes. Adapt my Privacy Policy to include GDPR wording

## Your Data Protection Rights Under General Data Protection Regulation (GDPR)
If the user is a citizen from the European Union (EU) or the European Economic Area (EEA), they possess specific rights regarding data protection, which are included in the General Data Protection Regulation (GDPR). More information about this regulation can be found at https://eur-lex.europa.eu/eli/reg/2016/679/oj.

The objective is to undertake rational measures to enable the correction, amendment, deletion, or limitation of the usage of Personal Data.

In order to obtain information about the Personal Data held about you and request its deletion from our systems, please contact us via email at ${
  data.contactbyemail.value
}.

In certain circumstances, users have the following data protection rights:

The right to access, update, or delete the information held on them;
The right of rectification. Users have the right to have their information corrected if it is deemed inaccurate or incomplete;
The right to object. Users have the right to object to the processing of their Personal Data;
The right of restriction. Users have the right to request that their personal information be processed in a restricted capacity;
The right to data portability. Users have the right to obtain a structured, machine-readable, and commonly used copy of their Personal Data;
The right to withdraw consent. Users have the right to withdraw their consent at any time in cases where we rely on their consent to process their personal information.
It should be noted that there may be occasions where we require you to confirm your identity before fulfilling your requests. Similarly, please be aware that certain data may be essential for us to provide our services to you.

Users have the right to file a complaint with a Data Protection Authority regarding the collection and use of their Personal Data. If you wish to obtain more information, please contact your local data protection authority in the European Economic Area (EEA).

14. Do you want your Privacy Policy to include CalOPPA wording?
- Yes. Adapt my Privacy Policy to include CalOPPA wording

## Your Data Protection Rights under the California Privacy Protection Act (CalOPPA)

The California Online Privacy Protection Act (CalOPPA) mandates that commercial websites and online services display a privacy policy. The scope of the law extends beyond California's borders, requiring individuals or companies operating websites that collect personally identifiable information from California consumers to exhibit a noticeable privacy policy on their websites. This privacy policy must accurately convey the data being collected and the parties with whom it is being shared, and compliance with the policy is mandatory. Find out more at https://consumercal.org/about-cfc/cfc-education-foundation/california-online-privacy-protection-act-caloppa-3/.

Following the guidelines of CalOPPA, the subsequent points are agreed upon:

It is possible for users to anonymously visit our site;
The Privacy Policy link, which contains the term "Privacy", is readily accessible on the website's homepage specified above;
Notification about any modifications made in the privacy policy shall be provided to users via our Privacy Policy Page;
Users hold the provision to modify their personal data by sending an email at ${data.contactbyemail.value}.
The Privacy Policy of this website maintains a stance that aligns with CalOPPA guidelines regarding "Do Not Track" signals. This means that we do not engage in tracking, cookie planting or advertising when a Do Not Track browser mechanism is activated. The "Do Not Track" feature is available in most web browsers and is used to convey your preference of not being tracked. You may modify this setting by accessing the Preferences or Settings page of your web browser.

15. Service Providers
Third party companies and individuals may be used to enable the Service ("Service Providers"), provide Service on our behalf, offer services related to the Service, or assist in evaluating how the Service is utilised.

The aforementioned third parties are granted access to Personal Data solely for the purpose of carrying out designated tasks on our behalf. Such parties are bound by a strict obligation not to disclose or utilize said data for any other purpose.

16. Links to Other Sites
The Service may hold links that navigate towards other sites not operated by the Service. Clicking on a link that redirects to a third party site will take you to said third party's site. Keeping your privacy in mind, we recommend you review the Privacy Policy of every site you visit.

Neither do we have any authority over, nor do we take any responsibility for the content, privacy policies or practices of any third-party sites or services you access through the links on our Service.

17. Do you collect information from kids under the age of 13?
- ${data.under13info}
`;
