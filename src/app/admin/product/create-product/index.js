"use client"
import { useState, useEffect  } from "react";
import {addProduct, getCategory, getUnit} from "@/service/ProductSevice";
import ImageUploader from "@/components/product/ImageUploader";
import {uploadMultipleToCloudinary} from "@/service/UploadToCloudinary";
import { FaPlus,FaTrash } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import {toast} from "react-toastify";
import { useRouter } from "next/navigation"
import Loading from "@/components/Loading";
import MyEditor from "@/components/MyEditor";

const MAX_IMAGES = 6;

export default function CreatProduct(){
    const router = useRouter();
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [batches, setBatches] = useState([]);
    const [retail, setRetail] = useState(0);
    const [isLoading, setIsLoading] = useState(true)
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price : 0,
        unitId : 1,
        categoryId: 1
    })
    const [variants, setVariants] = useState([]);
    const [distributions, setDistributions] = useState([]);

    const [units, setUnits] = useState([]);
    const [categories, setCategories] = useState([])

    const handleFilesChange = (files) => {
        setUploadedFiles(files);
    };

    // Thêm lô hàng
    const addBatch = () => {
        setBatches([...batches,
            {   name: "",
                importDate: "",
                outDate: "",
                quantity: 0,
                code : uuidv4()
            }
        ]);
    };

    // Xóa lô hàng
    const removeBatch = (index) => {
        setBatches(batches.filter((_, i) => i !== index));
    };

    // Thêm biến thể
    const addVariant = () => {
        setVariants([...variants, { name: "", weight: 0, price: 0 }]);
    };

    // Xóa biến thể
    const removeVariant = (index) => {
        setVariants(variants.filter((_, i) => i !== index));
    };

    const handlerSumRetail = () =>{
        let totalBatch = batches ? batches
            .reduce((sum, batch) => sum + (Number.parseFloat(batch.quantity) || 0), 0) : 0;
        let totalVariant = distributions ?
            distributions
                .reduce((sum, distribution) => sum + (Number.parseInt(distribution.quantity) * Number.parseFloat(distribution.weight) || 0), 0 ) : 0;
        return totalBatch - totalVariant;
    }

    // Tự động tạo danh sách phân phối
   useEffect(() => {
        (async ()=>{
            let resUnits = await getUnit();
            let resCategories = await getCategory();
            setCategories(resCategories.data);
            setUnits(resUnits.data);
            setIsLoading(false)
        })();
    },[]);

    useEffect(() => {
        const newDistributions = [];
        variants.forEach(variant => {
            batches.forEach(batch => {
                newDistributions.push({
                    variant: variant.name,
                    batch: batch.name,
                    weight : variant.weight,
                    batchCode: batch.code,
                    quantity: 0,
                });
            });
        });
        setDistributions(newDistributions);
        setRetail(handlerSumRetail())
    }, [variants, batches]);

    useEffect(() => {
        setRetail(handlerSumRetail())
    }, [variants, batches,distributions]);



    const getData = ()=>{
        if(uploadedFiles.length <=0 ){
            toast.error("Tối thiếu có 1 ảnh!")
            return false;
        }
        if(!product.name){
            toast.error("Điền tên sản phẩm!");
            return false;
        }
        if(product.price < 0 ){
            toast.error("Giá sản phẩm phải lớn hơn hoặc bằng 0!");
            return false;
        }
        if(batches.length <=0 ){
            toast.error("Tối thiếu có 1 lô hàng!")
            return false;
        }
        for (let i = 0; i < batches.length; i++ ){
            let  item = batches[i];
            if(!item.name){
                toast.error("Điền đầy đủ tên lô!");
                return false;
            }
            if(item.quantity < 0){
                toast.error("số lượng lô lớn hơn hoặc bằng 0!");
                return false;
            }
        }
        if(variants.length > 0) {
            for (let i = 0; i < variants.length; i++ ){
                let  item = variants[i];
                if(!item.name){
                    toast.error("Điền đầy đủ tên biến thế !");
                    return false;
                }
                if(item.weight < 0){
                    toast.error("Cân nặng biến thế lớn hơn hoặc bằng 0 !");
                    return false;
                }

                if(item.price < 0){
                    toast.error("Giá biến thế lớn hơn hoặc bằng 0 !");
                    return false;
                }
            }

            for (let i = 0; i < distributions.length; i++ ){
                let  item = distributions[i];
                if(item.quantity < 0){
                    toast.error("Số lương phân phối lớn hơn hoặc bằng 0!");
                    return false;
                }
            }
        }

        const productDetailSet =[];
        variants.forEach((item)=>{
            const  productDetail = {
                ...item,
                productDetailBatch : distributions.filter(d => d.variant === item.name )
            }
            productDetailSet.push(productDetail)
        })
        return {
            ...product,
            batchSet : batches,
            productDetailSet
        }
    }

    const  onSave = async ()=>{
        let data = getData()
        if(!data) return;
        setIsLoading(true)
        let resImages = await uploadMultipleToCloudinary(uploadedFiles)
        let newImages = resImages.map((item,index) => {
            return {
                slot: index,
                url : item.url
            }
        })
        data.images = newImages;
        let res = await addProduct(data);
        router.push("/admin/product")
    }
    return (
        <div className="container">
            {isLoading && <Loading/>}
            <div className="mx-auto bg-white p-6 shadow-lg rounded-lg">
                <div className="pt-2 d-flex justify-content-between mb-2">
                    <h2>Thêm sản phẩm</h2>
                    <button onClick={onSave} type="button" className="btn btn-primary">Lưu</button>
                </div>
                <div className="mb-4" style={{width: "max-content"}}>
                    <ImageUploader onFilesChange={handleFilesChange}/>
                </div>
                <div className="border border-gray-300 p-4 mb-4 rounded-lg bg-gray-50">
                    <div className="mb-4">
                        <label htmlFor="product-name" className="block mb-2 text-gray-700">Tên sản phẩm</label>
                        <input value={product.name}
                               onChange={(e) => setProduct({...product, name: e.target.value})}
                               type="text" id="product-name"
                               className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <select
                            value={product.unitId || 1}
                            onChange={(e) =>{
                                setProduct({...product, unitId: e.target.value})
                                }
                            }
                            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {units.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>

                        <input type="text"
                               value={product.price}
                               onChange={(e) => setProduct({...product, price: e.target.value})}
                               placeholder="Giá sản phẩm trên 1 đơn vị"
                               className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        <select
                            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value={1}>Nhà cung cấp</option>
                            <option value={1}>Long biên</option>
                            <option value={1}>Hà Nội</option>
                            <option value={1}>Đông Anh</option>
                        </select>
                    </div>
                </div>
                <div className=" mb-4">
                    <h4>Số lượng bán lẻ: {retail}</h4>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-lg ">Danh mục sản phẩm</label>
                    <select
                        value={product.categoryId || 1}
                        onChange={(e) =>{
                            setProduct({...product, categoryId: e.target.value})
                        }
                        }
                        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        {categories.map(item => <option key={item.id} value={item.id}>{item.name}</option>
                        )}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-lg">Mô tả sản phẩm</label>
                    <textarea value={product.description}
                              onChange={(e) => setProduct({...product, description: e.target.value})}
                              placeholder="Mô tả sản phẩm (có kèm AI để tự động gen)"
                              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              rows="4">

                    </textarea>
                    {/*<MyEditor/>*/}
                </div>
                <div className="mb-4 mb-4 d-flex justify-content-between">
                    <label className="block mb-2 text-lg">Lô hàng</label>
                    <button onClick={addBatch}
                            className="bg-blue-500 text-white px-2 py-2 rounded hover:bg-blue-600 flex items-center">
                        <FaPlus/>
                    </button>
                </div>
                <div className="border p-4 mb-4 bg-gray-50 rounded-lg">
                    {batches.map((batch, index) => (
                        <div key={index} className="grid grid-cols-5 gap-4 items-center mb-4">
                            <input type="text" placeholder="Tên lô" className="border p-2 rounded-lg"
                                   value={batch.name}
                                   onChange={(e) => {
                                       const newBatches = [...batches];
                                       newBatches[index].name = e.target.value;
                                       setBatches(newBatches);
                                   }}
                            />
                            <input  type="date" placeholder="Ngày thu hoạch" className="border p-2 rounded-lg"
                                    value={batch.importDate}
                                    onChange={(e) => {
                                        const newBatches = [...batches];
                                        newBatches[index].importDate = e.target.value;
                                        setBatches(newBatches);
                                    }}
                            />
                            <input
                                value={batch.outDate}
                                onChange={(e) => {
                                    const newBatches = [...batches];
                                    newBatches[index].outDate = e.target.value;
                                    setBatches(newBatches);
                                }}
                                type="date" placeholder="Ngày hết hạn" className="border p-2 rounded-lg"/>
                            <input
                                value={batch.quantity}
                                onChange={(e) => {
                                    const newBatches = [...batches];
                                    newBatches[index].quantity = e.target.value;
                                    setBatches(newBatches);
                                }}
                                type="number" placeholder="Số lượng" className="border p-2 rounded-lg"/>
                            <button onClick={() => removeBatch(index)}
                                    className="w-8 h-8 bg-red-500 text-white flex justify-center items-center rounded hover:bg-red-600 transition">
                                <FaTrash size={16}/>
                            </button>
                        </div>
                    ))}
                </div>

                {/* Biến thể */}
                <div className="mb-4 d-flex justify-content-between">
                    <label className="block mb-2 text-lg">Biến thể</label>
                    <button onClick={addVariant}
                            className="bg-blue-500 text-white px-2 py-2 rounded hover:bg-blue-600 flex items-center">
                        <FaPlus/>
                    </button>
                </div>
                <div className="border p-4 mb-4 bg-gray-50 rounded-lg">
                    {variants.map((variant, index) => (
                        <div key={index} className="grid grid-cols-4 gap-4 items-center mb-4">
                            <input type="text" placeholder="Tên biến thể" className="border p-2 rounded-lg"
                                   value={variant.name}
                                   onChange={(e) => {
                                       const newVariants = [...variants];
                                       newVariants[index].name = e.target.value;
                                       setVariants(newVariants);
                                   }}
                            />
                            <input
                                value={variant.weight}
                                onChange={(e) => {
                                    const newVariants = [...variants];
                                    newVariants[index].weight = e.target.value;
                                    setVariants(newVariants);
                                }}
                                type="number" placeholder="Cân nặng" className="border p-2 rounded-lg"/>
                            <input
                                value={variant.price}
                                onChange={(e) => {
                                    const newVariants = [...variants];
                                    newVariants[index].price = e.target.value;
                                    setVariants(newVariants);
                                }}
                                type="number" placeholder="Giá" className="border p-2 rounded-lg"/>
                            <button onClick={() => removeVariant(index)}
                                    className="w-8 h-8 bg-red-500 text-white flex justify-center items-center rounded hover:bg-red-600 transition">
                                <FaTrash size={16}/>
                            </button>
                        </div>
                    ))}
                </div>
                {/* Phân phối (Chỉ hiển thị khi có cả lô và biến thể) */}

                {batches.length > 0 && variants.length > 0 && (
                    <div className="mb-4">
                        <label className="block mb-2 text-lg">Phân phối</label>
                        <div className="border p-4 bg-gray-50 rounded-lg">
                            {distributions.map((distribution, index) => (
                                <div key={index} className="grid grid-cols-4 gap-4 mb-4">
                                    <input type="text" value={distribution.variant} className="border p-2 rounded-lg"
                                           disabled/>
                                    <input type="text" value={distribution.batch} className="border p-2 rounded-lg"
                                           disabled/>
                                    <input
                                        value={distribution.quantity}
                                        onChange={(e) => {
                                            const newDistribution = [...distributions];
                                            newDistribution[index].quantity = e.target.value;
                                            setDistributions(newDistribution);
                                        }}
                                        type="number" placeholder="Số lượng" className="border p-2 rounded-lg"/>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}