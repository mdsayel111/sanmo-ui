import { Avatar, Badge } from '../../lib';
import {
    Table,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr
} from '../../lib/components/shared/table';

import Container from "../components/shared/container";
import Section from "../components/shared/section";
import SourceCode from "../components/shared/source-code";

const USERS = [
    {
        id: 1,
        name: 'Tony M. Carter',
        role: 'Designer',
        email: 'tonymcarter@jourrapide.com',
        type: 'Member',
        avatar: 'https://i.pravatar.cc/150?u=1'
    },
    {
        id: 2,
        name: 'James E. Chamb',
        role: 'UI/UX Designer',
        email: 'jamesechambliss@teleworm.us',
        type: 'Admin',
        avatar: 'https://i.pravatar.cc/150?u=2'
    },
    {
        id: 3,
        name: 'Charlotte J. Torres',
        role: 'Copywriter',
        email: 'charlotte@jourrapide.com',
        type: 'Member',
        avatar: 'https://i.pravatar.cc/150?u=3'
    },
    {
        id: 4,
        name: 'Mary J. Germain',
        role: 'Full Stack',
        email: 'maryjgermain@jourrapide.com',
        type: 'CEO',
        avatar: 'https://i.pravatar.cc/150?u=4'
    },
];

export default function Tables() {
    return (
        <Container
            title="Tables"
            description="Documentation and examples for opt-in styling of tables with Bootstrap-like styles."
        >

            {/* Basic Example */}
            <Section
                title="Basic Example"
                description="For basic styling—light padding and only horizontal dividers."
            >
                <div className="p-4">
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>#</Th>
                                <Th>First</Th>
                                <Th>Last</Th>
                                <Th>Handle</Th>
                            </Tr>
                        </Thead>

                        <Tbody>
                            <Tr>
                                <Td>1</Td>
                                <Td>Mark</Td>
                                <Td>Otto</Td>
                                <Td>@mdo</Td>
                            </Tr>

                            <Tr>
                                <Td>2</Td>
                                <Td>Jacob</Td>
                                <Td>Thornton</Td>
                                <Td>@fat</Td>
                            </Tr>

                            <Tr>
                                <Td>3</Td>
                                <Td>Larry</Td>
                                <Td>Bird</Td>
                                <Td>@twitter</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </div>

                <SourceCode
                    code={`<Table>
  <Thead>
    <Tr>
      <Th>#</Th>
      <Th>First</Th>
      <Th>Last</Th>
      <Th>Handle</Th>
    </Tr>
  </Thead>

  <Tbody>
    <Tr>
      <Td>1</Td>
      <Td>Mark</Td>
      <Td>Otto</Td>
      <Td>@mdo</Td>
    </Tr>
  </Tbody>
</Table>`}
                />
            </Section>

            {/* Striped Rows */}
            <Section
                title="Striped Rows"
                description="Add zebra-striping to any table row within the tbody."
            >
                <div className="p-4">
                    <Table>
                        <Thead className="bg-secondary/10">
                            <Tr>
                                <Th>#</Th>
                                <Th>First</Th>
                                <Th>Last</Th>
                                <Th>Handle</Th>
                            </Tr>
                        </Thead>

                        <Tbody>
                            {[1, 2, 3].map((i) => (
                                <Tr
                                    key={i}
                                    className="odd:bg-transparent even:bg-secondary/10"
                                >
                                    <Td>{i}</Td>
                                    <Td>Mark</Td>
                                    <Td>Otto</Td>
                                    <Td>@mdo</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </div>

                <SourceCode
                    code={`<Tr className="odd:bg-transparent even:bg-secondary/10">
  ...
</Tr>`}
                />
            </Section>

            {/* Striped Columns */}
            <Section
                title="Striped Columns"
                description="Add zebra-striping to any table column."
            >
                <div className="p-4">
                    <Table>
                        <Thead className="bg-secondary/10">
                            <Tr>
                                <Th>#</Th>
                                <Th>First</Th>
                                <Th>Last</Th>
                                <Th>Handle</Th>
                            </Tr>
                        </Thead>

                        <Tbody>
                            {[1, 2, 3].map((i) => (
                                <Tr key={i}>
                                    <Td className="bg-secondary/10">{i}</Td>
                                    <Td>Mark</Td>
                                    <Td className="bg-secondary/10">Otto</Td>
                                    <Td>@mdo</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </div>

                <SourceCode
                    code={`<Td className="bg-secondary/10">...</Td>`}
                />
            </Section>

            {/* Bordered Table */}
            <Section
                title="Bordered Table"
                description="Add borders on all sides of the table and cells."
            >
                <div className="p-4">
                    <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                        <Table>
                            <Thead className="bg-secondary/10">
                                <Tr>
                                    <Th className="border-r border-slate-200 dark:border-slate-700">#</Th>
                                    <Th className="border-r border-slate-200 dark:border-slate-700">First</Th>
                                    <Th className="border-r border-slate-200 dark:border-slate-700">Last</Th>
                                    <Th>Handle</Th>
                                </Tr>
                            </Thead>

                            <Tbody>
                                {[1, 2].map((i) => (
                                    <Tr key={i}>
                                        <Td className="border-r border-slate-200 dark:border-slate-700">
                                            {i}
                                        </Td>

                                        <Td className="border-r border-slate-200 dark:border-slate-700">
                                            Mark
                                        </Td>

                                        <Td className="border-r border-slate-200 dark:border-slate-700">
                                            Otto
                                        </Td>

                                        <Td>@mdo</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </div>
                </div>

                <SourceCode
                    code={`<Td className="border-r border-slate-200 dark:border-slate-700">
  ...
</Td>`}
                />
            </Section>

            {/* Borderless */}
            <Section
                title="Tables without borders"
                description="Add a class to remove borders from the table and cells."
            >
                <div className="p-4">
                    <Table className="border-0">
                        <Thead>
                            <Tr>
                                <Th className="border-0">#</Th>
                                <Th className="border-0">First</Th>
                                <Th className="border-0">Last</Th>
                                <Th className="border-0">Handle</Th>
                            </Tr>
                        </Thead>

                        <Tbody>
                            {[1, 2].map((i) => (
                                <Tr key={i}>
                                    <Td className="border-0">{i}</Td>
                                    <Td className="border-0">Mark</Td>
                                    <Td className="border-0">Otto</Td>
                                    <Td className="border-0">@mdo</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </div>

                <SourceCode
                    code={`<Td className="border-0">...</Td>`}
                />
            </Section>

            {/* Active Tables */}
            <Section
                title="Active Tables"
                description="Highlight a table row or cell."
            >
                <div className="p-4">
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>#</Th>
                                <Th>First</Th>
                                <Th>Last</Th>
                                <Th>Handle</Th>
                            </Tr>
                        </Thead>

                        <Tbody>
                            <Tr className="bg-secondary/10">
                                <Td>1</Td>
                                <Td>Mark</Td>
                                <Td>Otto</Td>
                                <Td>@mdo</Td>
                            </Tr>

                            <Tr>
                                <Td>2</Td>
                                <Td>Jacob</Td>
                                <Td>Thornton</Td>
                                <Td>@fat</Td>
                            </Tr>

                            <Tr>
                                <Td>3</Td>
                                <Td className="bg-secondary/10">
                                    Larry Bird
                                </Td>
                                <Td>Simpsons</Td>
                                <Td>@twitter</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </div>

                <SourceCode
                    code={`<Tr className="bg-secondary/10">...</Tr>`}
                />
            </Section>

            {/* Small Table */}
            <Section
                title="Small tables"
                description="Make any table more compact."
            >
                <div className="p-4">
                    <Table>
                        <Thead>
                            <Tr>
                                <Th className="px-3 py-2">#</Th>
                                <Th className="px-3 py-2">First</Th>
                                <Th className="px-3 py-2">Last</Th>
                                <Th className="px-3 py-2">Handle</Th>
                            </Tr>
                        </Thead>

                        <Tbody>
                            {[1, 2, 3].map((i) => (
                                <Tr key={i}>
                                    <Td className="px-3 py-2">{i}</Td>
                                    <Td className="px-3 py-2">Mark</Td>
                                    <Td className="px-3 py-2">Otto</Td>
                                    <Td className="px-3 py-2">@mdo</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </div>

                <SourceCode
                    code={`<Td className="px-3 py-2">...</Td>`}
                />
            </Section>

            {/* Table Head & Foot */}
            <Section
                title="Table Head & Foot"
                description="Custom styles for header and footer sections."
            >
                <div className="p-4">
                    <Table>
                        <Thead className="bg-secondary text-white">
                            <Tr>
                                <Th>#</Th>
                                <Th>First</Th>
                                <Th>Last</Th>
                                <Th>Handle</Th>
                            </Tr>
                        </Thead>

                        <Tbody>
                            {[1, 2].map((i) => (
                                <Tr key={i}>
                                    <Td>{i}</Td>
                                    <Td>Mark</Td>
                                    <Td>Otto</Td>
                                    <Td>@mdo</Td>
                                </Tr>
                            ))}
                        </Tbody>

                        <Tfoot>
                            <Tr>
                                <Th>Footer</Th>
                                <Th>First</Th>
                                <Th>Last</Th>
                                <Th>Handle</Th>
                            </Tr>
                        </Tfoot>
                    </Table>
                </div>

                <SourceCode
                    code={`<Tfoot>
  ...
</Tfoot>`}
                />
            </Section>

            {/* Rich Content */}
            <Section
                title="With Avatars & Actions"
                description="A comprehensive example showing complex data display."
            >
                <div className="p-4">
                    <Table>
                        <Thead className="bg-secondary text-white">
                            <Tr>
                                <Th>Name</Th>
                                <Th>Title</Th>
                                <Th>Email</Th>
                                <Th>Role</Th>
                                <Th className="text-right">Action</Th>
                            </Tr>
                        </Thead>

                        <Tbody>
                            {USERS.map((user) => (
                                <Tr
                                    key={user.id}
                                    className="hover:bg-gray-200 dark:hover:bg-background"
                                >
                                    <Td>
                                        <div className="flex items-center gap-3">
                                            <Avatar
                                                src={user.avatar}
                                                alt={user.name}
                                                size="xs"
                                            />

                                            <span className="font-medium">
                                                {user.name}
                                            </span>
                                        </div>
                                    </Td>

                                    <Td>{user.role}</Td>

                                    <Td>{user.email}</Td>

                                    <Td>
                                        <Badge
                                            variant={
                                                user.type === "Admin"
                                                    ? "primary"
                                                    : user.type === "Member"
                                                        ? "warning"
                                                        : "success"
                                            }
                                        >
                                            {user.type}
                                        </Badge>
                                    </Td>

                                    <Td className="text-right">
                                        <button className="px-3 py-1 bg-secondary hover:bg-secondary/80 text-white text-xs font-medium rounded">
                                            Edit
                                        </button>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </div>

                <SourceCode
                    code={`<Avatar src="..." />
<Badge variant="primary">Admin</Badge>`}
                />
            </Section>
        </Container>
    );
}