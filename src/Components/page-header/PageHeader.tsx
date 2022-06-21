import { useState } from "react";
import { useResponsiveHandler } from "../../hooks/useResponsiveHandler";
import { MobileButton, MobileWrapper, Wrapper } from "./PageHeader.style";

type Props = {}

type Tabs = 'history' | 'graph' | 'new-measurement'
const PageHeaderComponent: React.FC<Props> = (props) => {
    const { isMobile } = useResponsiveHandler();
    const [selectedTab, setSelectedTab] = useState<Tabs>('new-measurement')

    const MobileHeader = () => {
        return (
            <>
                <MobileWrapper>
                    {/* <MobileButton isSelected={selectedTab === 'history'}>Historikk</MobileButton> */}
                    {/* <MobileButton isSelected={selectedTab === 'graph'}>Graf</MobileButton> */}
                    {/* <MobileButton isSelected={selectedTab === 'new-measurement'}>Ny måling</MobileButton> */}
                </MobileWrapper>
            </>
        );
    }

    if (isMobile) {
        return MobileHeader();
    }
    return (
        <>
            <Wrapper>
                <h3>Laktat</h3>
            </Wrapper>
        </>
    );
}

export default PageHeaderComponent;