import PageStyled, { PageHeader, PageBody, PageHeading, PageAction } from "./styled"

const PageWrapper = ({children, title="", extras, ...props}) => {
    return (
        <PageStyled {...props}>
            <PageHeader>
                <PageHeading title={title}>
                    {title}
                </PageHeading>

                {
                    extras && 
                    (<PageAction>
                        {extras}
                    </PageAction>)
                }
            </PageHeader>

            <PageBody>
                {children}
            </PageBody>
        </PageStyled>
    )
}

export default PageWrapper