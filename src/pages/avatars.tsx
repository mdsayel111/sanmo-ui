import Avatar from "../../lib/components/shared/avatar";
import Container from "../components/shared/container";
import Section from "../components/shared/section";
import SourceCode from "../components/shared/source-code";

export default function AvatarsPage() {
  const images = {
    user1: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    user2: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    user3: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80",
    user4: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=150&q=80",
    landscape: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    room: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80",
    nature: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=400&q=80"
  };

  return (
    <Container
      title="Avatars & Images"
      description="Create and group avatars of different sizes and shapes with custom CSS classes."
    >

      {/* 1. Basic Example */}
      <Section
        title="Basic Example"
        description={
          <span>
            Control size using props like <code>size="xs"</code>, <code>size="sm"</code>, etc. The default shape is rounded.
          </span>
        }
      >
        <div className="flex items-end gap-6 flex-wrap">
          <div className="text-center">
            <Avatar src={images.user1} size="xs" />
            <p className="mt-2 text-xs text-slate-500">.avatar-xs</p>
          </div>
          <div className="text-center">
            <Avatar src={images.user2} size="sm" />
            <p className="mt-2 text-xs text-slate-500">.avatar-sm</p>
          </div>
          <div className="text-center">
            <Avatar src={images.user1} size="md" />
            <p className="mt-2 text-xs text-slate-500">.avatar-md</p>
          </div>
          <div className="text-center">
            <Avatar src={images.user2} size="lg" />
            <p className="mt-2 text-xs text-slate-500">.avatar-lg</p>
          </div>
          <div className="text-center">
            <Avatar src={images.user3} size="xl" />
            <p className="mt-2 text-xs text-slate-500">.avatar-xl</p>
          </div>
        </div>

        <SourceCode code={`<Avatar src="..." size="xs" />
<Avatar src="..." size="sm" />
<Avatar src="..." size="md" />
<Avatar src="..." size="lg" />
<Avatar src="..." size="xl" />`} />
      </Section>

      {/* 2. Rounded Circle */}
      <Section
        title="Rounded Circle"
        description={
          <span>
            Using <code>shape="circle"</code> creates a fully rounded avatar.
          </span>
        }
      >
        <div className="flex items-end gap-8 flex-wrap">
          <div className="text-center">
            <Avatar src={images.user4} size="md" shape="circle" />
            <p className="mt-2 text-xs text-slate-500">.avatar-md .rounded-circle</p>
          </div>
          <div className="text-center">
            <Avatar src={images.user1} size="lg" shape="circle" />
            <p className="mt-2 text-xs text-slate-500">.avatar-lg .rounded-circle</p>
          </div>
          <div className="text-center">
            <Avatar src={images.user2} size="xl" shape="circle" />
            <p className="mt-2 text-xs text-slate-500">.avatar-xl .rounded-circle</p>
          </div>
        </div>

        <SourceCode code={`<Avatar size="md" shape="circle" ... />
<Avatar size="lg" shape="circle" ... />
<Avatar size="xl" shape="circle" ... />`} />
      </Section>

      {/* 3. Images Shapes & Thumbnails */}
      <Section
        title="Images Shapes"
        description="Avatars can also handle arbitrary image content with thumbnail styling."
      >
        <div className="flex items-end gap-6 flex-wrap">
          <div className="text-center">
            <Avatar src={images.nature} size="xl" className="w-40" />
            <p className="mt-2 text-xs text-slate-500">.rounded</p>
          </div>
          <div className="text-center">
            <Avatar src={images.user2} size="xl" />
            <p className="mt-2 text-xs text-slate-500">.rounded</p>
          </div>
          <div className="text-center">
            <Avatar src={images.user1} size="xl" shape="circle" />
            <p className="mt-2 text-xs text-slate-500">.rounded-circle</p>
          </div>
          <div className="text-center">
            <Avatar src={images.room} size="xl" className="w-40" thumbnail />
            <p className="mt-2 text-xs text-slate-500">.img-thumbnail</p>
          </div>
          <div className="text-center">
            <Avatar src={images.user1} size="xl" shape="circle" thumbnail />
            <p className="mt-2 text-xs text-slate-500">.rounded-circle .img-thumbnail</p>
          </div>
        </div>

        <SourceCode code={`<Avatar size="xl" />
<Avatar size="xl" shape="circle" />
<Avatar size="xl" thumbnail />
<Avatar size="xl" shape="circle" thumbnail />`} />
      </Section>

    </Container>
  );
}