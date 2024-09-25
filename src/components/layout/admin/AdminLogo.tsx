import Logo from 'components/common/Logo'

interface AdminLogoProps {
  collapsed?: boolean
}
export default function AdminLogo({ collapsed }: AdminLogoProps) {
  return (
    <div className="flex h-16 items-center overflow-hidden whitespace-nowrap pl-6 transition-all">
      <Logo radius="full" width={32} classNames={{ wrapper: 'mr-2 min-w-[32px]' }} />
      {!collapsed && <h2 className="text-xl font-semibold text-[#6A45FF]">Manta Shop</h2>}
    </div>
  )
}
