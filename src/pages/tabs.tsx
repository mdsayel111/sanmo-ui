import { Home, MessageSquare, User } from 'lucide-react';
import Tab from '../../lib/components/shared/tab/tab';
import TabContent from '../../lib/components/shared/tab/tab-content';
import TabList from '../../lib/components/shared/tab/tab-list';
import TabTrigger from '../../lib/components/shared/tab/tab-trigger';
import Container from '../components/shared/container';
import Section from '../components/shared/section';
import SourceCode from '../components/shared/source-code';







// Placeholder Text Component
const ExampleText = () => (
    <p className='text-slate-900 dark:text-slate-200'>
        Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua franca: On refusa continuar payar custosi traductores.
    </p>
);

export default function Tabs() {
    return (
        <Container
            title="Tabs"
            description="Use the tabs component to generate a tabbed interface for organizing content across different screens, data sets, and other interactions."
        >

            {/* 1. Nav Tabs */}
            <Section title="Nav Tabs" description="Use the default variant to generate a standard tabbed interface.">
                <Tab defaultValue="home">
                    <TabList>
                        <TabTrigger value="home">Home</TabTrigger>
                        <TabTrigger value="profile">Profile</TabTrigger>
                        <TabTrigger value="messages">Messages</TabTrigger>
                    </TabList>
                    <TabContent value="home"><ExampleText /></TabContent>
                    <TabContent value="profile"><p>This is the Profile tab content. It shows specific user details.</p></TabContent>
                    <TabContent value="messages"><p>You have 3 new messages in your inbox.</p></TabContent>
                </Tab>

                <SourceCode code={`import { Tabs, TabsList, TabsTrigger, TabsContent } from 'sanmo-ui';

<Tabs defaultValue="home">
  <TabsList>
    <TabsTrigger value="home">Home</TabsTrigger>
    <TabsTrigger value="profile">Profile</TabsTrigger>
    <TabsTrigger value="messages">Messages</TabsTrigger>
  </TabsList>
  <TabsContent value="home">Content...</TabsContent>
  <TabsContent value="profile">Content...</TabsContent>
</Tabs>`} />
            </Section>

            {/* 2. Tabs Justified */}
            <Section title="Tabs Justified" description="Force your tabs menu items to use the full available width.">
                <Tab defaultValue="home" justified>
                    <TabList>
                        <TabTrigger value="home">Home</TabTrigger>
                        <TabTrigger value="profile">Profile</TabTrigger>
                        <TabTrigger value="messages">Messages</TabTrigger>
                    </TabList>
                    <TabContent value="home"><ExampleText /></TabContent>
                    <TabContent value="profile"><ExampleText /></TabContent>
                    <TabContent value="messages"><ExampleText /></TabContent>
                </Tab>

                <SourceCode code={`<Tabs defaultValue="home" justified>
  <TabsList>
    <TabsTrigger value="home">Home</TabsTrigger>
    <TabsTrigger value="profile">Profile</TabsTrigger>
    <TabsTrigger value="messages">Messages</TabsTrigger>
  </TabsList>
  {/* ... content ... */}
</Tabs>`} />
            </Section>

            {/* 3. Nav Pills */}
            <Section title="Nav Pills" description="Use the pills variant to generate a filled, pill-shaped interface.">
                <Tab defaultValue="profile" variant="pills">
                    <TabList>
                        <TabTrigger value="home">Home</TabTrigger>
                        <TabTrigger value="profile">Profile</TabTrigger>
                        <TabTrigger value="messages">Messages</TabTrigger>
                    </TabList>
                    <TabContent value="home"><ExampleText /></TabContent>
                    <TabContent value="profile"><ExampleText /></TabContent>
                    <TabContent value="messages"><ExampleText /></TabContent>
                </Tab>

                <SourceCode code={`<Tabs defaultValue="home" variant="pills">
  <TabsList>
    <TabsTrigger value="home">Home</TabsTrigger>
    {/* ... */}
  </TabsList>
</Tabs>`} />
            </Section>

            {/* 4. Pills Justified */}
            <Section title="Pills Justified" description="Force your pill menu items to use the full available width.">
                <div className="p-4 rounded-lg">
                    <Tab defaultValue="profile" variant="pills" justified>
                        <TabList>
                            <TabTrigger value="home">Home</TabTrigger>
                            <TabTrigger value="profile">Profile</TabTrigger>
                            <TabTrigger value="messages">Messages</TabTrigger>
                        </TabList>
                        <TabContent value="home"><ExampleText /></TabContent>
                        <TabContent value="profile"><ExampleText /></TabContent>
                        <TabContent value="messages"><ExampleText /></TabContent>
                    </Tab>
                </div>

                <SourceCode code={`<Tabs defaultValue="home" variant="pills" justified>
  <TabsList>
     {/* ... */}
  </TabsList>
</Tabs>`} />
            </Section>

            {/* 5. Tabs Vertical Left */}
            <Section title="Tabs Vertical Left" description="Stack your navigation by changing the flex item direction.">
                <Tab defaultValue="messages" orientation="vertical">
                    <TabList>
                        <TabTrigger value="home">Home</TabTrigger>
                        <TabTrigger value="profile">Profile</TabTrigger>
                        <TabTrigger value="messages">Messages</TabTrigger>
                        <TabTrigger value="settings">Settings</TabTrigger>
                    </TabList>
                    <div className=" p-6 rounded-lg1">
                        <TabContent value="home"><h3 className="text-white font-bold mb-2">Home</h3><ExampleText /></TabContent>
                        <TabContent value="profile"><h3 className="text-white font-bold mb-2">Profile</h3><ExampleText /></TabContent>
                        <TabContent value="messages"><h3 className="text-white font-bold mb-2">Messages</h3><ExampleText /></TabContent>
                        <TabContent value="settings"><h3 className="text-white font-bold mb-2">Settings</h3><ExampleText /></TabContent>
                    </div>
                </Tab>

                <SourceCode code={`<Tabs defaultValue="home" orientation="vertical">
  <TabsList>
    <TabsTrigger value="home">Home</TabsTrigger>
    <TabsTrigger value="profile">Profile</TabsTrigger>
  </TabsList>
  
  <TabsContent value="home">...</TabsContent>
  <TabsContent value="profile">...</TabsContent>
</Tabs>`} />
            </Section>

            {/* 6. Tabs Vertical Right */}
            <Section title="Tabs Vertical Right" description="Stack your navigation on the right side.">
                <Tab defaultValue="home" orientation="vertical" reverse>
                    <TabList>
                        <TabTrigger value="home">Home</TabTrigger>
                        <TabTrigger value="profile">Profile</TabTrigger>
                        <TabTrigger value="messages">Messages</TabTrigger>
                    </TabList>
                    <div className="p-6 rounded-lg flex-1">
                        <TabContent value="home"><h3 className="text-white font-bold mb-2">Home</h3><ExampleText /></TabContent>
                        <TabContent value="profile"><h3 className="text-white font-bold mb-2">Profile</h3><ExampleText /></TabContent>
                        <TabContent value="messages"><h3 className="text-white font-bold mb-2">Messages</h3><ExampleText /></TabContent>
                    </div>
                </Tab>

                <SourceCode code={`<Tabs defaultValue="home" orientation="vertical" reverse>
  <TabsList>
    <TabsTrigger value="home">Home</TabsTrigger>
    {/* ... */}
  </TabsList>
  {/* ... */}
</Tabs>`} />
            </Section>

            {/* 7. With Icons (Bonus) */}
            <Section title="With Icons" description="Enhance tabs with icons for better visual cues.">
                <Tab defaultValue="home" variant="pills">
                    <TabList>
                        <TabTrigger value="home">
                            <span className="flex items-center gap-2"><Home size={16} /> Home</span>
                        </TabTrigger>
                        <TabTrigger value="profile">
                            <span className="flex items-center gap-2"><User size={16} /> Profile</span>
                        </TabTrigger>
                        <TabTrigger value="messages">
                            <span className="flex items-center gap-2"><MessageSquare size={16} /> Messages</span>
                        </TabTrigger>
                    </TabList>
                    <TabContent value="home"><ExampleText /></TabContent>
                    <TabContent value="profile"><ExampleText /></TabContent>
                    <TabContent value="messages"><ExampleText /></TabContent>
                </Tab>
                <SourceCode code={`<TabsTrigger value="home">
  <span className="flex items-center gap-2">
    <Home size={16} /> Home
  </span>
</TabsTrigger>`} />
            </Section>

        </Container>
    );
}