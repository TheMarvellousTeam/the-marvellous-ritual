import THREE, {Vector3} from 'three'

const url = [
    require('file?[hash].[ext]!../../asset/texture/envmap/posx.jpg'),
    require('file?[hash].[ext]!../../asset/texture/envmap/posx.jpg'),
    require('file?[hash].[ext]!../../asset/texture/envmap/posx.jpg'),
    require('file?[hash].[ext]!../../asset/texture/envmap/posx.jpg'),
    require('file?[hash].[ext]!../../asset/texture/envmap/posx.jpg'),
    require('file?[hash].[ext]!../../asset/texture/envmap/posx.jpg'),
]
// const url = [
//     require('file?[hash].[ext]!../../asset/texture/envmap/posx.png'),
//     require('file?[hash].[ext]!../../asset/texture/envmap/negx.png'),
//     require('file?[hash].[ext]!../../asset/texture/envmap/posy.png'),
//     require('file?[hash].[ext]!../../asset/texture/envmap/negy.png'),
//     require('file?[hash].[ext]!../../asset/texture/envmap/posz.png'),
//     require('file?[hash].[ext]!../../asset/texture/envmap/negz.png'),
// ]

export const init = ( scene ) =>
    new Promise( resolve => {

        const textureCube = THREE.ImageUtils.loadTextureCube( url )
        textureCube.format = THREE.RGBFormat
        textureCube.mapping = THREE.CubeReflectionMapping


        const cubeShader = THREE.ShaderLib[ "cube" ];
        const cubeMaterial = new THREE.ShaderMaterial( {
            fragmentShader: cubeShader.fragmentShader,
            vertexShader: cubeShader.vertexShader,
            uniforms: cubeShader.uniforms,
            depthWrite: false,
            side: THREE.BackSide
        } )

        cubeMaterial.uniforms[ "tCube" ].value = textureCube

        const cubeMesh = new THREE.Mesh( new THREE.BoxGeometry( 500, 500, 500 ), cubeMaterial )
        scene.add( cubeMesh )


    })
