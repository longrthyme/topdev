import React, { useState, useEffect } from "react";
import { Pagination, Row, Col, Typography } from "antd";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import companyAPI from "../../api/company";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import styles from "./Companypage.module.css";
import { Button } from "@/components/ui/button";
import { FilterIcon, FilterXIcon, Search, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
// import { cn } from "@/lib/utils";
const { Title, Paragraph } = Typography;

const CompanyPage = () => {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [address, setAddress] = useState(undefined);
  const [industry, setIndustry] = useState(undefined);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [size] = useState(6);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSearching) {
      const fetchCompanies = async () => {
        try {
          const response = await companyAPI.getAllCompanies(page - 1, size);
          setCompanies(response.data.data.content);
          setTotalPages(response.data.data.page.totalPages);
          setTotalElements(response.data.data.page.totalElements);
        } catch (error) {
          console.error("Error fetching companies:", error);
        }
      };

      fetchCompanies();
    }
  }, [page, size, isSearching]);

  useEffect(() => {
    if (isSearching) {
      const searchCompanies = async () => {
        try {
          const response = await companyAPI.searchCompanies(search, address, industry, page - 1, size);
          setCompanies(response.data.data.content);
          setTotalPages(response.data.data.page.totalPages);
          setTotalElements(response.data.data.page.totalElements);
        } catch (error) {
          console.error("Error searching companies:", error);
        }
      };

      searchCompanies();
    }
  }, [search, address, industry, page, size, isSearching]);

  const handleCompanyClick = (id) => {
    navigate(`/companies/${id}`);
  };

  const handleSearch = () => {
    setIsSearching(true);
    setPage(1);
  };

  const handleClearSearch = () => {
    setSearch("");
    setAddress(undefined);
    setIndustry(undefined);
    setIsSearching(false);
    setPage(1);
  };

  return (
    <div className={styles.container}>
      <Header />
      <div style={{ paddingTop: "80px" }}>
        <div className={styles.introSection}>
          <Title level={2} className={styles.introTitle}>Khám phá các công ty hàng đầu</Title>
          <Paragraph className={styles.introText}>
            Tìm kiếm và kết nối với các công ty hàng đầu trong nhiều lĩnh vực khác nhau.
          </Paragraph>
        </div>

        <div className={styles.searchSection}>
          <Title level={3} className={styles.title}>Tìm kiếm Công ty</Title>
          <div className={styles.searchBox}>
            <Input placeholder="Nhập tên công ty" value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: "30%", marginRight: "10px" }} />
            
            <Select onValueChange={setAddress} value={address}>
              <SelectTrigger className="w-[20%]">
                <SelectValue placeholder="Chọn địa chỉ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ha Noi">Hà Nội</SelectItem>
                <SelectItem value="TP HCM">TP HCM</SelectItem>
                <SelectItem value="Da Nang">Đà Nẵng</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={setIndustry} value={industry}>
              <SelectTrigger className="w-[20%]">
                <SelectValue placeholder="Chọn lĩnh vực" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="IT">Công nghệ</SelectItem>
                <SelectItem value="BANK">Ngân hàng</SelectItem>
                <SelectItem value="INSURANCE">Bảo hiểm</SelectItem>
                <SelectItem value="E_COMMERCE">Thương mại điện tử</SelectItem>
                <SelectItem value="COMMUNICATION">Truyền thông</SelectItem>
                <SelectItem value="TOURISM">Du lịch</SelectItem>
                <SelectItem value="REAL_ESTATE">Bất động sản</SelectItem>
                <SelectItem value="OUTSOURCE">Outsource</SelectItem>
                <SelectItem value="FINTECH">Fintech</SelectItem>
                <SelectItem value="MANUFACTURING">Sản xuất</SelectItem>
              </SelectContent>
            </Select>

            <Button className="bg-primaryRed font-bold hover:bg-primaryRed" onClick={handleSearch} type="primary" style={{ marginRight: "10px" }}>
  <Search className="w-4 h-4 mr-2" />
  Tìm kiếm
</Button>

<Button className="bg-primaryRed font-bold hover:bg-primaryRed" onClick={handleClearSearch} type="default">
  <FilterXIcon className="w-4 h-4 mr-2" />
  Xóa tìm kiếm
</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {companies.map((company) => (
        <Card
          key={company.id}
          className="hover:shadow-lg cursor-pointer"
          onClick={() => handleCompanyClick(company.id)}
        >
          <CardContent className="p-4 flex flex-col items-center">
            <img
              src={company.avatar}
              alt={company.name}
              className="w-24 h-24 object-cover rounded-full mb-3"
            />
            <h3 className="text-lg font-semibold text-black text-left">
              {company.name}
            </h3>
            <p className="text-sm text-black text-left mt-1">
            {company.description.split(" ").slice(0, 10).join(" ")}...            </p>
            <p className="text-sm text-gray-500 text-left mt-2">
              {company.address}
            </p>
            <p className="text-sm text-gray-500 text-left mt-1">
              {company.industry}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>

        <div className={styles.pagination}>
          <Pagination current={page} total={totalElements} pageSize={size} onChange={(page) => setPage(page)} showSizeChanger={false} showQuickJumper />
        </div>
      </div>
    </div>
  );
};

export default CompanyPage;
