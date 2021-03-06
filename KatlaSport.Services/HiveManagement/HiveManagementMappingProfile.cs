﻿using System;
using AutoMapper;
using DataAccessHive = KatlaSport.DataAccess.ProductStoreHive.StoreHive;
using DataAccessHiveSection = KatlaSport.DataAccess.ProductStoreHive.StoreHiveSection;

namespace KatlaSport.Services.HiveManagement
{
    public sealed class HiveManagementMappingProfile : Profile
    {
        public HiveManagementMappingProfile()
        {
            CreateMap<DataAccessHive, HiveListItem>();
            CreateMap<DataAccessHive, Hive>();
            CreateMap<DataAccessHiveSection, HiveSectionListItem>();
            CreateMap<DataAccessHiveSection, HiveSection>()
                .ForMember(r => r.HiveId, opt => opt.MapFrom(s => s.StoreHiveId));

            CreateMap<UpdateHiveRequest, DataAccessHive>()
                .ForMember(r => r.LastUpdated, opt => opt.MapFrom(p => DateTime.UtcNow));

            CreateMap<UpdateHiveSectionRequest, DataAccessHiveSection>()
                .ForMember(r => r.LastUpdated, opt => opt.MapFrom(p => DateTime.UtcNow))
                .ForMember(r => r.StoreHiveId, opt => opt.MapFrom(s => s.HiveId));
        }
    }
}
