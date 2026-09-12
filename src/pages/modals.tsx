import { useState } from 'react';
import Button from '../../lib/components/shared/button';
import Modal from '../../lib/components/shared/modal/modal';
import ModalBody from '../../lib/components/shared/modal/modal-body';
import Container from '../components/shared/container';
import Section from '../components/shared/section';
import SourceCode from '../components/shared/source-code';


export default function Modals() {
    const [defaultModal, setDefaultModal] = useState(false);
    const [staticModal, setStaticModal] = useState(false);
    const [scrollModal, setScrollModal] = useState(false);

    const [posCenter, setPosCenter] = useState(false);
    const [posTop, setPosTop] = useState(false);
    const [posBottom, setPosBottom] = useState(false);

    const [toggle1, setToggle1] = useState(false);
    const [toggle2, setToggle2] = useState(false);

    const [sizeXL, setSizeXL] = useState(false);
    const [sizeLG, setSizeLG] = useState(false);
    const [sizeSM, setSizeSM] = useState(false);

    const [fullScreen, setFullScreen] = useState(false);

    const [alertPrimary, setAlertPrimary] = useState(false);
    const [alertSecondary, setAlertSecondary] = useState(false);
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [alertInfo, setAlertInfo] = useState(false);

    return (
        <Container
            title="Modals"
            description="Use our modal plugin to add dialogs to your site for lightboxes, user notifications, or completely custom content."
        >

            {/* 1. Default Modals */}
            <Section title="Default Modals">
                <Button onClick={() => setDefaultModal(true)}>Launch demo modal</Button>
                <Modal
                    isOpen={defaultModal}
                    onClose={() => setDefaultModal(false)}
                    title="Modal title"
                    footer={
                        <>
                            <Button variant="secondary" onClick={() => setDefaultModal(false)}>Close</Button>
                            <Button onClick={() => setDefaultModal(false)}>Save changes</Button>
                        </>
                    }
                >
                    <ModalBody>Woohoo, you're reading this text in a modal!</ModalBody>
                </Modal>

                <SourceCode code={`import { modal } from 'sanmo-ui';
                
const [isOpen, setIsOpen] = useState(false);

<Modal 
  isOpen={isOpen} 
  onClose={() => setIsOpen(false)}
  title="Modal title"
  footer={
    <Button onClick={() => setIsOpen(false)}>Save changes</Button>
  }
>
  <ModalBody>Modal content goes here...</ModalBody>
</Modal>`} />
            </Section>

            {/* 2. Static Backdrop */}
            <Section title="Static Backdrop">
                <Button onClick={() => setStaticModal(true)}>Launch static backdrop modal</Button>
                <Modal
                    isOpen={staticModal}
                    onClose={() => setStaticModal(false)}
                    title="Static Backdrop"
                    staticBackdrop
                    footer={<Button variant="secondary" onClick={() => setStaticModal(false)}>Close</Button>}
                >
                    <ModalBody>
                        I will not close if you click outside me. Don't even try to press escape key.
                    </ModalBody>
                </Modal>

                <SourceCode code={`import { modal } from 'sanmo-ui';

<Modal 
  isOpen={isOpen} 
  staticBackdrop
  title="Static Backdrop"
  // ...
>`} />
            </Section>

            {/* 3. Scrolling Long Content */}
            <Section title="Scrolling Long Content">
                <Button onClick={() => setScrollModal(true)}>Launch demo modal</Button>
                <Modal
                    isOpen={scrollModal}
                    onClose={() => setScrollModal(false)}
                    title="Scrolling Content"
                    scrollable
                    footer={
                        <>
                            <Button variant="secondary" onClick={() => setScrollModal(false)}>Close</Button>
                            <Button onClick={() => setScrollModal(false)}>Save changes</Button>
                        </>
                    }
                >
                    <ModalBody>
                        {[...Array(20)].map((_, i) => (
                            <p key={i} className="mb-4">
                                Paragraph {i + 1}: This is some placeholder content to demonstrate a scrolling modal.
                                The content here is long enough to force a scrollbar to appear within the modal body if the 'scrollable' prop is true.
                            </p>
                        ))}
                    </ModalBody>
                </Modal>

                <SourceCode code={`import { modal } from 'sanmo-ui';

<Modal 
  isOpen={isOpen} 
  scrollable
  title="Scrolling Content"
  // ...
>`} />
            </Section>

            {/* 4. Modal Position */}
            <Section title="Modal Position">
                <div className="flex flex-wrap gap-4">
                    <Button onClick={() => setPosCenter(true)}>Vertically centered modal</Button>
                    <Button onClick={() => setPosTop(true)}>Top Modal</Button>
                    <Button variant="success" onClick={() => setPosBottom(true)}>Bottom Modal</Button>
                </div>

                <Modal isOpen={posCenter} onClose={() => setPosCenter(false)} position="center" title="Centered Modal"><ModalBody>Vertically centered content.</ModalBody></Modal>
                <Modal isOpen={posTop} onClose={() => setPosTop(false)} position="top" title="Top Modal"><ModalBody>Aligned to the top.</ModalBody></Modal>
                <Modal isOpen={posBottom} onClose={() => setPosBottom(false)} position="bottom" title="Bottom Modal"><ModalBody>Aligned to the bottom.</ModalBody></Modal>

                <SourceCode code={`<Modal position="center" ... />
<Modal position="top" ... />
<Modal position="bottom" ... />`} />
            </Section>

            {/* 5. Toggle Between Modals */}
            <Section title="Toggle Between Modals">
                <Button onClick={() => setToggle1(true)}>Open first modal</Button>

                {/* Modal 1 */}
                <Modal
                    isOpen={toggle1}
                    onClose={() => setToggle1(false)}
                    title="Modal 1"
                    footer={<Button onClick={() => { setToggle1(false); setTimeout(() => setToggle2(true), 300); }}>Open Second Modal</Button>}
                >
                    <ModalBody>Show a second modal and hide this one with the button below.</ModalBody>
                </Modal>

                {/* Modal 2 */}
                <Modal
                    isOpen={toggle2}
                    onClose={() => setToggle2(false)}
                    title="Modal 2"
                    footer={<Button variant="secondary" onClick={() => { setToggle2(false); setTimeout(() => setToggle1(true), 300); }}>Back to First</Button>}
                >
                    <ModalBody>Hide this modal and show the first with the button below.</ModalBody>
                </Modal>

                <SourceCode code={`import { modal } from 'sanmo-ui';

{/* Logic to swap states */}

{/* Modal 1 */}
<Modal
    isOpen={toggle1}
    onClose={() => setToggle1(false)}
    title="Modal 1"
    footer={<Button onClick={() => { setToggle1(false); setTimeout(() => setToggle2(true), 300); }}>Open Second Modal</Button>}
>
    <ModalBody>Show a second modal and hide this one with the button below.</ModalBody>
</Modal>

{/* Modal 2 */}
<Modal
    isOpen={toggle2}
    onClose={() => setToggle2(false)}
    title="Modal 2"
    footer={<Button variant="secondary" onClick={() => { setToggle2(false); setTimeout(() => setToggle1(true), 300); }}>Back to First</Button>}
>
    <ModalBody>Hide this modal and show the first with the button below.</ModalBody>
</Modal>`} />
            </Section>

            {/* 6. Optional Sizes */}
            <Section title="Optional Sizes">
                <div className="flex flex-wrap gap-4">
                    <Button onClick={() => setSizeXL(true)}>Extra large modal</Button>
                    <Button onClick={() => setSizeLG(true)}>Large modal</Button>
                    <Button onClick={() => setSizeSM(true)}>Small modal</Button>
                </div>

                <Modal isOpen={sizeXL} onClose={() => setSizeXL(false)} size="xl" title="Extra Large Modal"><ModalBody>XL Content</ModalBody></Modal>
                <Modal isOpen={sizeLG} onClose={() => setSizeLG(false)} size="lg" title="Large Modal"><ModalBody>LG Content</ModalBody></Modal>
                <Modal isOpen={sizeSM} onClose={() => setSizeSM(false)} size="sm" title="Small Modal"><ModalBody>SM Content</ModalBody></Modal>

                <SourceCode code={`import { modal } from 'sanmo-ui';

<Modal size="xl" ... />
<Modal size="lg" ... />
<Modal size="sm" ... />`} />
            </Section>

            {/* 7. Fullscreen Modal */}
            <Section title="Fullscreen Modal">
                <div className="flex flex-wrap gap-4">
                    <Button onClick={() => setFullScreen(true)}>Full screen</Button>
                </div>
                <Modal isOpen={fullScreen} onClose={() => setFullScreen(false)} size="full" title="Fullscreen Modal" footer={<Button onClick={() => setFullScreen(false)}>Close</Button>}>
                    <ModalBody>
                        <p>This covers the entire screen.</p>
                    </ModalBody>
                </Modal>
                <SourceCode code={`import { modal } from 'sanmo-ui';

<Modal size="full" ... />`}
                />
            </Section>

            {/* 8. Modal Based Alerts */}
            <Section title="Modal Based Alerts">
                <div className="flex flex-wrap gap-4">
                    <Button onClick={() => setAlertPrimary(true)}>Primary Alert</Button>
                    <Button variant="secondary" onClick={() => setAlertSecondary(true)}>Secondary Alert</Button>
                    <Button variant="success" onClick={() => setAlertSuccess(true)}>Success Alert</Button>
                    <Button variant="info" onClick={() => setAlertInfo(true)}>Info Alert</Button>
                </div>

                <Modal isOpen={alertPrimary} onClose={() => setAlertPrimary(false)} variant="primary" title="Primary Alert" footer={<Button onClick={() => setAlertPrimary(false)}>Ok</Button>}><ModalBody>A simple primary alert check it out!</ModalBody></Modal>
                <Modal isOpen={alertSecondary} onClose={() => setAlertSecondary(false)} variant="secondary" title="Secondary Alert" footer={<Button variant="secondary" onClick={() => setAlertSecondary(false)}>Close</Button>}><ModalBody>A simple secondary alert check it out!</ModalBody></Modal>
                <Modal isOpen={alertSuccess} onClose={() => setAlertSuccess(false)} variant="success" title="Success Alert" footer={<Button variant="success" onClick={() => setAlertSuccess(false)}>Done</Button>}><ModalBody>Operation completed successfully!</ModalBody></Modal>
                <Modal isOpen={alertInfo} onClose={() => setAlertInfo(false)} variant="info" title="Info Alert" footer={<Button variant="info" onClick={() => setAlertInfo(false)}>Understand</Button>}><ModalBody>Here is some useful information.</ModalBody></Modal>

                <SourceCode code={`import { modal } from 'sanmo-ui';

<Modal variant="danger" title="Error" ... />
<Modal variant="success" title="Success" ... />`} />
            </Section>

        </Container>
    );
}