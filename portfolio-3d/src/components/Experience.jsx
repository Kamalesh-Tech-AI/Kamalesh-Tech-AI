import { OrbitControls, Float, MeshDistortMaterial, Sparkles, Text, Center, RoundedBox, MeshWobbleMaterial, ContactShadows } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

const SkillPillar = ({ position, label, color }) => {
    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <group position={position}>
                <RoundedBox args={[0.8, 0.2, 0.8]} radius={0.05} smoothness={4}>
                    <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} emissive={color} emissiveIntensity={0.2} />
                </RoundedBox>
                <Text
                    position={[0, 0.25, 0]}
                    fontSize={0.18}
                    color="white"
                    anchorY="bottom"
                    font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
                >
                    {label}
                </Text>
            </group>
        </Float>
    )
}

const PotatoChip = () => {
    return (
        <Float speed={4} rotationIntensity={2} floatIntensity={1}>
            <mesh position={[-4, 2, 2]} rotation={[Math.PI / 4, 0, 0]}>
                <cylinderGeometry args={[0.3, 0.3, 0.02, 32]} />
                <MeshWobbleMaterial color="#f1c40f" speed={2} factor={0.6} metalness={0.5} roughness={0.2} />
            </mesh>
            <Text position={[-4, 2.5, 2]} fontSize={0.1} color="#f1c40f">POTATO CHIP MODE</Text>
        </Float>
    )
}

const LogoK = () => {
    return (
        <group position={[0, 1.2, 0]}>
            {/* Vertial bar */}
            <RoundedBox args={[0.2, 1.2, 0.2]} radius={0.05} position={[-0.3, 0, 0]}>
                <meshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={0.5} />
            </RoundedBox>
            {/* Upper diagonal */}
            <RoundedBox args={[0.2, 0.8, 0.2]} radius={0.05} position={[0.1, 0.3, 0]} rotation={[0, 0, -Math.PI / 4]}>
                <meshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={0.5} />
            </RoundedBox>
            {/* Lower diagonal */}
            <RoundedBox args={[0.2, 0.8, 0.2]} radius={0.05} position={[0.1, -0.3, 0]} rotation={[0, 0, Math.PI / 4]}>
                <meshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={0.5} />
            </RoundedBox>
        </group>
    )
}

const ContributionGraph = () => {
    const cubes = useMemo(() => {
        const data = []
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 15; j++) {
                data.push({
                    position: [j * 0.25 - 1.75, 0, i * 0.25 - 0.75],
                    height: Math.random() * 0.8 + 0.1,
                    color: Math.random() > 0.4 ? '#39d353' : '#0e4429'
                })
            }
        }
        return data
    }, [])

    return (
        <group position={[4, -1.8, -4]} rotation={[0, -Math.PI / 4, 0]}>
            <Text position={[0, 2, 0]} fontSize={0.25} color="white">CONTRIBUTIONS</Text>
            {cubes.map((cube, i) => (
                <mesh key={i} position={[cube.position[0], cube.height / 2, cube.position[2]]}>
                    <boxGeometry args={[0.2, cube.height, 0.2]} />
                    <meshStandardMaterial color={cube.color} emissive={cube.color} emissiveIntensity={Math.random() * 0.5} />
                </mesh>
            ))}
        </group>
    )
}

export const Experience = () => {
    const skills = [
        { label: 'Python', color: '#3776AB', pos: [-5, 0.5, -3] },
        { label: 'JavaScript', color: '#F7DF1E', pos: [-3, 1.2, -5] },
        { label: 'React', color: '#61DAFB', pos: [3, 0.8, -5] },
        { label: 'AI & DS', color: '#FF6B6B', pos: [5, 1.5, -3] },
        { label: 'Docker', color: '#2496ED', pos: [-6, 0, 1] },
        { label: 'AWS', color: '#FF9900', pos: [6, 0, 1] },
    ]

    return (
        <>
            <OrbitControls
                makeDefault
                enablePan={false}
                maxPolarAngle={Math.PI / 2.1}
                minPolarAngle={Math.PI / 6}
                zoomSpeed={0.4}
                autoRotate
                autoRotateSpeed={0.5}
            />

            {/* Lights */}
            <ambientLight intensity={0.2} />
            <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={2} castShadow color="#00f2ff" />
            <pointLight position={[-10, 5, -10]} intensity={1.5} color="#8000ff" />
            <directionalLight position={[0, 10, 0]} intensity={0.5} />

            {/* Hero Content */}
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <group>
                    <LogoK />
                    <mesh castShadow>
                        <sphereGeometry args={[1.5, 64, 64]} />
                        <MeshDistortMaterial color="#080808" speed={3} distort={0.4} roughness={0} metalness={1} transparent opacity={0.8} />
                    </mesh>
                </group>
            </Float>

            {/* Main Title */}
            <Center position={[0, 3.5, 0]}>
                <Text
                    fontSize={0.8}
                    color="white"
                    font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
                >
                    KAMALESH S
                </Text>
            </Center>

            {/* Skills */}
            {skills.map((skill, i) => (
                <SkillPillar key={i} position={skill.pos} label={skill.label} color={skill.color} />
            ))}

            {/* Extra Interactive / Fun */}
            <PotatoChip />
            <ContributionGraph />

            {/* Background Ambience */}
            <Sparkles count={500} scale={20} size={2} speed={0.3} color="#00f2ff" />
            <Sparkles count={200} scale={20} size={5} speed={0.2} color="#8000ff" />

            {/* Floor & Contacts */}
            <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.5} far={10} color="#000000" position={[0, -2, 0]} />

            <mesh rotation-x={-Math.PI / 2} position-y={-2.01} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="#010101" />
            </mesh>
            <gridHelper args={[60, 60, 0x222222, 0x111111]} position-y={-2} />
        </>
    )
}
