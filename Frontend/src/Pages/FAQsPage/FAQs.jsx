import React from 'react';
import Layout from '../Layout';
import FAQAccordion from '../../components/Faq';

function FAQs() {
    return (
        <Layout>
            <FAQAccordion showButton={false} />
        </Layout>
    );
}

export default FAQs;
