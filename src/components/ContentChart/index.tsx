import { Col } from "antd";
import { Fade } from "react-awesome-reveal";
import { withTranslation } from "react-i18next";
import { ContentBlockProps } from "./types";
import { Button } from "../../common/Button";
import familyData from "../../content/FamilyContent.json";

import {
    ContentSection,
    Content,
    ContentWrapper,
    ServiceWrapper,
    StyledRow,
    ButtonWrapper,
} from "./styles";
import { PieChart } from "../Chart/PieChart";

const ContentBlock = ({
    title,
    content,
    button,
    t,
    id,
    direction,
    chartComponent ,
}: ContentBlockProps) => {
    const scrollTo = (id: string) => {
        const element = document.getElementById(id) as HTMLDivElement;
        element.scrollIntoView({
            behavior: "smooth",
        });
    };

    return (
        <ContentSection>
            <Fade direction={direction} triggerOnce>
                <StyledRow
                    justify="space-between"
                    align="middle"
                    id={id}
                    direction={direction}
                >
                    <Col lg={11} md={11} sm={12} xs={24}>
                        {chartComponent} 
                    </Col>

                    <Col lg={11} md={11} sm={11} xs={24}>
                        <ContentWrapper>
                            <h6>{t(title)}</h6>
                            <Content>{t(content)}</Content>
                            {direction === "right" ? (
                                <ButtonWrapper>
                                    {typeof button === "object" &&
                                        button.map(
                                            (
                                                item: {
                                                    color?: string;
                                                    title: string;
                                                },
                                                id: number
                                            ) => {
                                                return (
                                                    <Button
                                                        key={id}
                                                        color={item.color}
                                                        onClick={() => scrollTo("about")}
                                                    >
                                                        {t(item.title)}
                                                    </Button>
                                                );
                                            }
                                        )}
                                </ButtonWrapper>
                            ) : (
                                <ServiceWrapper>
                                </ServiceWrapper>
                            )}
                        </ContentWrapper>
                    </Col>
                </StyledRow>
            </Fade>
        </ContentSection>
    );
};
export default withTranslation()(ContentBlock);
