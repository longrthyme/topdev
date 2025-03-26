import React, { useState, useEffect } from "react";
import { Input, Button, Pagination, Card, Row, Col, Typography } from "antd";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { FilterXIcon, Search, X } from "lucide-react";
import companyAPI from "../../api/company"; // API lấy danh sách công ty
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header"; // Import Header
import styles from "../company/Companypage.module.css";

const { Title, Paragraph } = Typography;

const JobPage = () => {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [address, setAddress] = useState(undefined);
  const [industry, setIndustry] = useState(undefined);
  const [jobLevel, setJobLevel] = useState(undefined);
  const [workType, setWorkType] = useState(undefined);
  const [contractType, setContractType] = useState(undefined);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [size] = useState(6);
  const [isSearching, setIsSearching] = useState(false);
  const [salary, setSalary] = useState(undefined);
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
          const response = await companyAPI.searchCompanies(search, address, industry, salary, jobLevel, workType, contractType, page - 1, size);
          setCompanies(response.data.data.content);
          setTotalPages(response.data.data.page.totalPages);
          setTotalElements(response.data.data.page.totalElements);
        } catch (error) {
          console.error("Error searching companies:", error);
        }
      };
      searchCompanies();
    }
  }, [search, salary, address, industry, jobLevel, workType, contractType, page, size, isSearching]);

  const handleSearch = () => {
    setIsSearching(true);
    setPage(1);
  };

  const handleClearSearch = () => {
    setSearch("");
    setAddress(undefined);
    setIndustry(undefined);
    setJobLevel(undefined);
    setWorkType(undefined);
    setContractType(undefined);
    setIsSearching(false);
    setPage(1);
    setSalary(undefined);
  };

  return (
    <div className={styles.container}>
      <Header />
      <div style={{ paddingTop: "80px" }}>
        <div className={styles.introSection}>
          <Title level={2} className={styles.introTitle}>
            Khám phá các công ty hàng đầu
          </Title>
          <Paragraph className={styles.introText}>
            Tìm kiếm và kết nối với các công ty hàng đầu trong nhiều lĩnh vực khác nhau. Hãy khám phá cơ hội nghề nghiệp phù hợp với bạn!
          </Paragraph>
        </div>
        <div className={styles.searchSection}>
          <Title level={3} className={styles.title}>Tìm kiếm Công ty</Title>
          <div className={styles.searchBox}>
            <Input
              placeholder="Nhập tên công ty"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "30%", marginRight: "10px" }}
            />
            <Select onValueChange={setAddress}>
              <SelectTrigger className="w-1/5 mr-2">
                <SelectValue placeholder="Chọn địa chỉ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ha Noi">Hà Nội</SelectItem>
                <SelectItem value="TP HCM">TP HCM</SelectItem>
                <SelectItem value="Da Nang">Đà Nẵng</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={setIndustry}>
              <SelectTrigger className="w-1/5 mr-2">
                <SelectValue placeholder="Chọn ngành nghề" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="IT">Công nghệ thông tin</SelectItem>
                <SelectItem value="Finance">Tài chính</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={setJobLevel}>
              <SelectTrigger className="w-1/5 mr-2">
                <SelectValue placeholder="Chọn cấp bậc" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Intern">Intern</SelectItem>
                <SelectItem value="Fresher">Fresher</SelectItem>
                <SelectItem value="Junior">Junior</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={setWorkType}>
              <SelectTrigger className="w-1/5 mr-2">
                <SelectValue placeholder="Chọn loại công việc" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="In Office">In Office</SelectItem>
                <SelectItem value="Hybrid">Hybrid</SelectItem>
                <SelectItem value="Remote">Remote</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={setContractType}>
              <SelectTrigger className="w-1/5 mr-2">
                <SelectValue placeholder="Chọn loại hợp đồng" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Fulltime">Fulltime</SelectItem>
                <SelectItem value="Freelance">Freelance</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={setSalary}>
              <SelectTrigger className="w-1/5 mr-2">
                <SelectValue placeholder="Chọn mức lương" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3000000"> Từ 3.000.000 đ</SelectItem>
                <SelectItem value="5000000"> Từ 5.000.000 đ</SelectItem>
                <SelectItem value="7000000"> Từ 7.000.000 đ</SelectItem>
                <SelectItem value="10000000"> Từ 10.000.000 đ</SelectItem>
                <SelectItem value="15000000"> Từ 15.000.000 đ</SelectItem>
              </SelectContent>
            </Select>
          
            <Button className="bg-primaryRed font-bold hover:bg-primaryRed" onClick={handleSearch} type="primary" style={{ marginRight: "10px" }}>
  <Search className="w-4 h-4 mr-2" />
  Tìm kiếm
</Button>

<Button className="bg-primaryRed font-bold hover:bg-primaryRed text-white" onClick={handleClearSearch} type="default">
  <FilterXIcon className="w-4 h-4 mr-2" />
  Xóa tìm kiếm
</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPage;